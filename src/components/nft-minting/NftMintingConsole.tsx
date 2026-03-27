"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { useWallet } from "@/context/WalletContext";
import { useMintNftsMutation } from "@/services";
import { cn } from "@/utils";

import { PlusIcon, TrashBinIcon, TickMarkIcon, CloseLineIcon } from "@/icons";

type ConsoleTab = "minting" | "governance" | "tiers" | "collection";
type EditionType = "unique" | "limited" | "open";

interface Attribute {
  trait_type: string;
  value: string;
}

interface PreviewAsset {
  id: number;
  name: string;
  tier: string;
  status: string;
  price: string;
  owner: string;
  image: string;
  badge?: string;
  maxSupply?: string;
  imageFile?: string;
}

interface TierCard {
  id: number;
  name: string;
  minted: number;
  maxSupply: number;
  uri: string;
  paused: boolean;
}

interface MetadataCsvRow {
  id: number;
  name: string;
  imageFile: string;
  maxSupply: string;
  usd: string;
  badge: string;
  description?: string;
}

const requiredMetadataHeaders = [
  "id",
  "name",
  "image_file",
  "max_supply",
  "usd",
  "badge",
] as const;

const DEFAULT_MINT_CHAIN_ID = 8453;
const DEFAULT_MAX_SUPPLY = "100";
const DEFAULT_NFT_NAME = "Symoria Genesis #001";
const DEFAULT_DESCRIPTION =
  "A public mint interface for high-signal digital collectibles.";
const DEFAULT_ATTRIBUTES: Attribute[] = [
  { trait_type: "Tier", value: "Genesis" },
  { trait_type: "Utility", value: "Vault Access" },
];

const parseMintValue = (value: string) => {
  const trimmedValue = value.trim();
  const parsedNumber = Number(trimmedValue);

  return Number.isFinite(parsedNumber) ? parsedNumber : trimmedValue;
};

const tierOptions = [
  { value: "1", label: "Genesis" },
  { value: "2", label: "Collector" },
  { value: "3", label: "Signature" },
];

const initialCollection: PreviewAsset[] = [
  {
    id: 1042,
    name: "Genesis Aurora",
    tier: "Genesis",
    status: "Live",
    price: "0.20 ETH",
    owner: "Vault",
    image: "/images/cards/card-01.png",
  },
  {
    id: 1043,
    name: "Neon Archive",
    tier: "Collector",
    status: "Locked",
    price: "0.35 ETH",
    owner: "Reserved",
    image: "/images/cards/card-02.png",
  },
  {
    id: 1044,
    name: "Signal Bloom",
    tier: "Signature",
    status: "Preview",
    price: "0.48 ETH",
    owner: "Treasury",
    image: "/images/cards/card-03.png",
  },
  {
    id: 1045,
    name: "Chain Relic",
    tier: "Genesis",
    status: "Live",
    price: "0.18 ETH",
    owner: "Vault",
    image: "/images/cards/card-04.png",
  },
];

const initialTiers: TierCard[] = [
  {
    id: 1,
    name: "Genesis",
    minted: 42,
    maxSupply: 100,
    uri: "ipfs://genesis/",
    paused: false,
  },
  {
    id: 2,
    name: "Collector",
    minted: 16,
    maxSupply: 50,
    uri: "ipfs://collector/",
    paused: false,
  },
  {
    id: 3,
    name: "Signature",
    minted: 4,
    maxSupply: 12,
    uri: "ipfs://signature/",
    paused: true,
  },
];

const recentMints = [
  {
    recipient: "0xA5f2...91cD",
    status: "Queued",
    tx: "0x9f...d01a",
    time: "09:18",
  },
  {
    recipient: "0xB821...44E2",
    status: "Confirmed",
    tx: "0x3c...84f2",
    time: "08:52",
  },
  {
    recipient: "0xF11a...2b7C",
    status: "Minted",
    tx: "0xaa...019e",
    time: "08:11",
  },
];

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      const nextCharacter = line[index + 1];

      if (inQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

function parseMetadataCsv(text: string) {
  const normalizedText = text.replace(/^\uFEFF/, "");
  const lines = normalizedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error(
      "CSV must include a header row and at least one metadata row.",
    );
  }

  const headers = parseCsvLine(lines[0]).map((header) =>
    header.toLowerCase().replace(/\s+/g, "_"),
  );

  const missingHeaders = requiredMetadataHeaders.filter(
    (header) => !headers.includes(header),
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `Missing required column(s): ${missingHeaders.join(", ")}. Expected id,name,image_file,max_supply,usd,badge.`,
    );
  }

  return lines.slice(1).map((line, rowIndex) => {
    const values = parseCsvLine(line);
    const getValue = (header: (typeof requiredMetadataHeaders)[number]) => {
      const headerIndex = headers.indexOf(header);
      return values[headerIndex]?.trim() ?? "";
    };
    const getOptionalValue = (header: string) => {
      const headerIndex = headers.indexOf(header);
      return headerIndex >= 0 ? (values[headerIndex]?.trim() ?? "") : "";
    };

    const idValue = getValue("id");
    const parsedId = Number(idValue);

    if (!Number.isFinite(parsedId) || parsedId <= 0) {
      throw new Error(`Row ${rowIndex + 2}: id must be a positive number.`);
    }

    const nameValue = getValue("name");
    const imageFileValue = getValue("image_file");
    const maxSupplyValue = getValue("max_supply");
    const usdValue = getValue("usd");
    const badgeValue = getValue("badge");
    const descriptionValue = getOptionalValue("description");

    if (
      !nameValue ||
      !imageFileValue ||
      !maxSupplyValue ||
      !usdValue ||
      !badgeValue
    ) {
      throw new Error(
        `Row ${rowIndex + 2}: all metadata fields must be populated.`,
      );
    }

    return {
      id: parsedId,
      name: nameValue,
      imageFile: imageFileValue,
      maxSupply: maxSupplyValue,
      usd: usdValue,
      badge: badgeValue,
      description: descriptionValue || undefined,
    } satisfies MetadataCsvRow;
  });
}

function SectionTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-brand-500 text-white shadow-theme-xs"
          : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-300 dark:ring-gray-800 dark:hover:bg-white/[0.06]"
      }`}
    >
      {label}
    </button>
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={cn(
        "w-full rounded-[14px] border border-white/10 bg-[#0C0C11]/50 px-4 py-3 text-sm text-white transition-all duration-300 placeholder:text-gray-500 focus:outline-hidden focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10",
        className,
      )}
    />
  );
}

export default function NftMintingConsole() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const metadataCsvInputRef = useRef<HTMLInputElement>(null);
  const {
    account,
    connectWallet,
    disconnectWallet,
    isConnecting,
    isCorrectNetwork,
    switchNetwork,
    targetChainName,
  } = useWallet();
  const [mintNfts, { isLoading: isMinting }] = useMintNftsMutation();
  const [activeTab, setActiveTab] = useState<ConsoleTab>("minting");
  const [selectedTier, setSelectedTier] = useState("1");
  const [editionType, setEditionType] = useState<EditionType>("limited");
  const [maxSupply, setMaxSupply] = useState(DEFAULT_MAX_SUPPLY);
  const [name, setName] = useState(DEFAULT_NFT_NAME);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [attributes, setAttributes] = useState<Attribute[]>(DEFAULT_ATTRIBUTES);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [metadataRows, setMetadataRows] = useState<MetadataCsvRow[]>([]);
  const [metadataCsvName, setMetadataCsvName] = useState<string | null>(null);
  const [mintStatus, setMintStatus] = useState(
    "Mint execution is still waiting on contract and IPFS integration.",
  );
  const [transfersPaused, setTransfersPaused] = useState(false);
  const [tiers, setTiers] = useState<TierCard[]>(initialTiers);
  const [registrySearch, setRegistrySearch] = useState("");
  const [registryTierFilter, setRegistryTierFilter] = useState("all");
  const mintChainId = Number(
    process.env.NEXT_PUBLIC_MINT_CHAIN_ID ?? DEFAULT_MINT_CHAIN_ID,
  );
  const mintChainLabel =
    process.env.NEXT_PUBLIC_MINT_CHAIN_NAME ??
    (mintChainId === 8453 ? "Base" : `Chain ${mintChainId}`);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const resetMintForm = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedTier("1");
    setEditionType("limited");
    setMaxSupply(DEFAULT_MAX_SUPPLY);
    setName(DEFAULT_NFT_NAME);
    setDescription(DEFAULT_DESCRIPTION);
    setAttributes(DEFAULT_ATTRIBUTES);
    setFiles([]);
    setPreviewUrls([]);
    setPreviewIndex(0);
    setMetadataRows([]);
    setMetadataCsvName(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (metadataCsvInputRef.current) {
      metadataCsvInputRef.current.value = "";
    }
  };

  const shortAddress = (value: string) =>
    `${value.slice(0, 6)}...${value.slice(-4)}`;

  const selectedTierLabel =
    tierOptions.find((option) => option.value === selectedTier)?.label ??
    "Genesis";

  const metadataImageMap = useMemo(() => {
    return new Map(
      metadataRows.map((row) => [row.imageFile.toLowerCase(), row]),
    );
  }, [metadataRows]);

  const previewUrlByFileName = useMemo(() => {
    return new Map(
      files.map((file, index) => [
        file.name.toLowerCase(),
        previewUrls[index] ?? "",
      ]),
    );
  }, [files, previewUrls]);

  const matchedMetadataCount = useMemo(() => {
    return metadataRows.filter((row) =>
      previewUrlByFileName.has(row.imageFile.toLowerCase()),
    ).length;
  }, [metadataRows, previewUrlByFileName]);

  const requiredArtworkCount = metadataRows.length;
  const hasMetadataCsv = requiredArtworkCount > 0;
  const hasExactArtworkCount =
    !hasMetadataCsv || files.length === requiredArtworkCount;
  const hasCompleteArtworkMapping =
    !hasMetadataCsv || matchedMetadataCount === requiredArtworkCount;

  const missingArtworkFileNames = useMemo(() => {
    if (!hasMetadataCsv) {
      return [];
    }

    return metadataRows
      .filter((row) => !previewUrlByFileName.has(row.imageFile.toLowerCase()))
      .map((row) => row.imageFile);
  }, [hasMetadataCsv, metadataRows, previewUrlByFileName]);

  const collectionItems = useMemo<PreviewAsset[]>(() => {
    if (metadataRows.length === 0) {
      return initialCollection;
    }

    return metadataRows.map((row) => ({
      id: row.id,
      name: row.name,
      tier: selectedTierLabel,
      status: previewUrlByFileName.has(row.imageFile.toLowerCase())
        ? "Artwork Ready"
        : "Metadata Loaded",
      price: `$${Number(row.usd).toLocaleString()} USD`,
      owner: row.badge,
      image: previewUrlByFileName.get(row.imageFile.toLowerCase()) ?? "",
      badge: row.badge,
      maxSupply: row.maxSupply,
      imageFile: row.imageFile,
    }));
  }, [metadataRows, previewUrlByFileName, selectedTierLabel]);

  const filteredCollection = useMemo(() => {
    return collectionItems.filter((item) => {
      const matchesSearch =
        registrySearch.trim() === "" ||
        item.name.toLowerCase().includes(registrySearch.toLowerCase()) ||
        String(item.id).includes(registrySearch);
      const matchesTier =
        registryTierFilter === "all" ||
        item.tier.toLowerCase() === registryTierFilter.toLowerCase();

      return matchesSearch && matchesTier;
    });
  }, [collectionItems, registrySearch, registryTierFilter]);

  const activeMetadata = useMemo(() => {
    const file = files[previewIndex];

    if (file) {
      const matchedByImageName = metadataImageMap.get(file.name.toLowerCase());
      if (matchedByImageName) {
        return matchedByImageName;
      }
    }

    return metadataRows[previewIndex];
  }, [files, metadataImageMap, metadataRows, previewIndex]);

  const currentPreview = useMemo(() => {
    const currentUrl = previewUrls[previewIndex];
    const previewAttributes = activeMetadata
      ? [
          { trait_type: "Badge", value: activeMetadata.badge },
          {
            trait_type: "Price",
            value: `$${Number(activeMetadata.usd).toLocaleString()} USD`,
          },
          { trait_type: "Max Supply", value: activeMetadata.maxSupply },
          { trait_type: "Image File", value: activeMetadata.imageFile },
        ]
      : attributes;

    return {
      url: currentUrl,
      title: activeMetadata?.name || name || "Untitled NFT",
      description: activeMetadata
        ? activeMetadata.description ||
          `${activeMetadata.badge} release priced at $${Number(activeMetadata.usd).toLocaleString()} with a max supply of ${activeMetadata.maxSupply}.`
        : description || "No description provided yet for this release.",
      attributes: previewAttributes,
    };
  }, [
    activeMetadata,
    attributes,
    description,
    name,
    previewIndex,
    previewUrls,
  ]);

  const stageArtworkFiles = (incomingFiles: File[], sourceLabel: string) => {
    if (incomingFiles.length === 0) {
      return;
    }

    if (hasMetadataCsv) {
      const expectedFileNames = new Set(
        metadataRows.map((row) => row.imageFile.toLowerCase()),
      );
      const existingFileNames = new Set(
        files.map((file) => file.name.toLowerCase()),
      );
      const incomingSeenNames = new Set<string>();
      const duplicateFileNames: string[] = [];
      const unexpectedFileNames = incomingFiles
        .filter((file) => {
          const normalizedName = file.name.toLowerCase();

          if (
            existingFileNames.has(normalizedName) ||
            incomingSeenNames.has(normalizedName)
          ) {
            duplicateFileNames.push(file.name);
            return false;
          }

          incomingSeenNames.add(normalizedName);
          return !expectedFileNames.has(normalizedName);
        })
        .map((file) => file.name);

      if (unexpectedFileNames.length > 0 || duplicateFileNames.length > 0) {
        const issues = [
          unexpectedFileNames.length > 0
            ? `unexpected filenames: ${unexpectedFileNames.join(", ")}`
            : null,
          duplicateFileNames.length > 0
            ? `duplicate filenames: ${duplicateFileNames.join(", ")}`
            : null,
        ]
          .filter(Boolean)
          .join("; ");

        setMintStatus(
          `Artwork upload blocked. Filenames must exactly match the CSV image_file values; ${issues}.`,
        );
        return;
      }

      const nextCount = files.length + incomingFiles.length;

      if (nextCount > requiredArtworkCount) {
        setMintStatus(
          `Artwork upload blocked. The metadata CSV contains ${requiredArtworkCount} row(s), so you can only stage ${requiredArtworkCount} image(s) in total.`,
        );
        return;
      }
    }

    const nextUrls = incomingFiles.map((file) => URL.createObjectURL(file));
    const nextFiles = [...files, ...incomingFiles];
    const nextPreviewUrls = [...previewUrls, ...nextUrls];
    const nextPreviewUrlByFileName = new Map(
      nextFiles.map((file, index) => [
        file.name.toLowerCase(),
        nextPreviewUrls[index] ?? "",
      ]),
    );
    const nextMatchedMetadataCount = metadataRows.filter((row) =>
      nextPreviewUrlByFileName.has(row.imageFile.toLowerCase()),
    ).length;

    setFiles(nextFiles);
    setPreviewUrls(nextPreviewUrls);
    setMintStatus(
      hasMetadataCsv
        ? `${nextFiles.length}/${requiredArtworkCount} artwork file(s) uploaded. ${nextMatchedMetadataCount}/${requiredArtworkCount} metadata row(s) currently match uploaded filenames.`
        : `${incomingFiles.length} asset(s) ${sourceLabel} in the mint queue.`,
    );
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const selected = Array.from(event.target.files);
    stageArtworkFiles(selected, "staged");

    if (event.target) {
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!event.dataTransfer.files?.length) {
      return;
    }

    const dropped = Array.from(event.dataTransfer.files);
    stageArtworkFiles(dropped, "added");
  };

  const handleRemoveFile = (index: number) => {
    const removedUrl = previewUrls[index];
    if (removedUrl) {
      URL.revokeObjectURL(removedUrl);
    }

    setFiles((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
    setPreviewUrls((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
    setPreviewIndex((current) =>
      Math.max(0, Math.min(current, previewUrls.length - 2)),
    );

    if (hasMetadataCsv) {
      setMintStatus(
        `${files.length - 1}/${requiredArtworkCount} artwork file(s) remain. Upload exactly ${requiredArtworkCount} images and ensure every image_file from the CSV is present.`,
      );
    }
  };

  const handleMetadataCsvUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const parsedRows = parseMetadataCsv(content);
      const firstRow = parsedRows[0];

      setMetadataRows(parsedRows);
      setMetadataCsvName(file.name);
      setName(firstRow?.name ?? "");
      setMaxSupply(firstRow?.maxSupply ?? "");
      setDescription(
        firstRow
          ? firstRow.description ||
              `${firstRow.badge} release priced at $${Number(firstRow.usd).toLocaleString()} with a max supply of ${firstRow.maxSupply}.`
          : "",
      );
      setAttributes(
        firstRow
          ? [
              { trait_type: "Badge", value: firstRow.badge },
              {
                trait_type: "Price",
                value: `$${Number(firstRow.usd).toLocaleString()} USD`,
              },
              { trait_type: "Max Supply", value: firstRow.maxSupply },
            ]
          : [],
      );
      setMintStatus(
        `${parsedRows.length} metadata row(s) imported from ${file.name}. Upload exactly ${parsedRows.length} image(s); ${parsedRows.filter((row) => previewUrlByFileName.has(row.imageFile.toLowerCase())).length}/${parsedRows.length} currently match uploaded artwork by image filename.`,
      );
    } catch (error) {
      setMetadataRows([]);
      setMetadataCsvName(null);
      setMintStatus(
        error instanceof Error
          ? error.message
          : "Unable to parse metadata CSV.",
      );
    } finally {
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const clearMetadataCsv = () => {
    setMetadataRows([]);
    setMetadataCsvName(null);
    setMintStatus(
      "Metadata CSV cleared. You can upload a new file with id,name,image_file,max_supply,usd,badge and an optional description column.",
    );
  };

  const updateAttribute = (
    index: number,
    field: keyof Attribute,
    value: string,
  ) => {
    setAttributes((current) =>
      current.map((attribute, currentIndex) =>
        currentIndex === index ? { ...attribute, [field]: value } : attribute,
      ),
    );
  };

  const addAttribute = () => {
    setAttributes((current) => [...current, { trait_type: "", value: "" }]);
  };

  const removeAttribute = (index: number) => {
    setAttributes((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const handleConnectWallet = async () => {
    if (!account) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }

    disconnectWallet();
    setMintStatus(
      "Wallet disconnected. Reconnect to continue with mint preparation.",
    );
  };

  const handleMintClick = () => {
    if (transfersPaused) {
      setMintStatus("Transfers are paused. Resume transfers before minting.");
      return;
    }

    if (!hasMetadataCsv) {
      setMintStatus(
        "Upload a metadata CSV before minting. The API requires an imageFile entry for every NFT.",
      );
      return;
    }

    if (files.length === 0) {
      setMintStatus("Upload the artwork files before minting.");
      return;
    }

    if (hasMetadataCsv && !hasExactArtworkCount) {
      setMintStatus(
        `Upload exactly ${requiredArtworkCount} image(s) to match the ${requiredArtworkCount} metadata row(s) before minting.`,
      );
      return;
    }

    if (hasMetadataCsv && !hasCompleteArtworkMapping) {
      setMintStatus(
        `Filename match incomplete. ${matchedMetadataCount}/${requiredArtworkCount} CSV row(s) currently have matching uploaded artwork. Missing: ${missingArtworkFileNames.join(", ")}.`,
      );
      return;
    }

    const imageFileMap = new Map(
      files.map((file) => [file.name.toLowerCase(), file]),
    );
    const orderedImages = metadataRows.map((row) =>
      imageFileMap.get(row.imageFile.toLowerCase()),
    );

    if (orderedImages.some((image) => !image)) {
      setMintStatus(
        `Filename match incomplete. ${matchedMetadataCount}/${requiredArtworkCount} CSV row(s) currently have matching uploaded artwork. Missing: ${missingArtworkFileNames.join(", ")}.`,
      );
      return;
    }

    const payload = metadataRows.map((row) => ({
      id: String(row.id),
      name: row.name,
      imageFile: row.imageFile,
      maxSupply: parseMintValue(row.maxSupply),
      usd: parseMintValue(row.usd),
      badge: row.badge,
      ...(row.description ? { description: row.description } : {}),
    }));

    void (async () => {
      try {
        const response = await mintNfts({
          chainId: mintChainId,
          nfts: payload,
          images: orderedImages as File[],
        }).unwrap();

        resetMintForm();

        setMintStatus(
          response.message ||
            `${payload.length} NFT(s) submitted successfully for minting on ${mintChainLabel} (${mintChainId}).`,
        );
      } catch (error) {
        const errorMessage =
          typeof error === "object" && error !== null && "data" in error
            ? ((error as { data?: { message?: string } }).data?.message ?? null)
            : null;

        setMintStatus(
          errorMessage ||
            "Mint request failed. Check the CSV rows, filenames, and API authentication.",
        );
      }
    })();
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        pageTitle="NFT Minting Console"
        info="Mint new NFTs, manage tiers, and oversee your collection with this comprehensive console built for creators and project teams."
      />

      {/* <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <SectionTab
              active={activeTab === "minting"}
              label="Minting Console"
              onClick={() => setActiveTab("minting")}
            />
            <SectionTab
              active={activeTab === "governance"}
              label="Governance"
              onClick={() => setActiveTab("governance")}
            />
            <SectionTab
              active={activeTab === "tiers"}
              label="Tier Config"
              onClick={() => setActiveTab("tiers")}
            />
            <SectionTab
              active={activeTab === "collection"}
              label="Asset Registry"
              onClick={() => setActiveTab("collection")}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={account && isCorrectNetwork ? "outline" : "primary"}
              onClick={() => {
                void handleConnectWallet();
              }}
              disabled={isConnecting}
              className="min-w-[180px]"
            >
              {!account
                ? isConnecting
                  ? "Connecting..."
                  : "Connect Wallet"
                : !isCorrectNetwork
                  ? `Switch to ${targetChainName}`
                  : shortAddress(account)}
            </Button>
            <Badge color={transfersPaused ? "error" : "success"}>
              {transfersPaused ? "Transfers Paused" : "Network Live"}
            </Badge>
            <Badge color="info">Protected Route</Badge>
            <Badge color="light">
              {account ? shortAddress(account) : "Wallet Optional"}
            </Badge>
          </div>
        </div>
      </div> */}

      <div className="rounded-2xl border border-brand-200/40 bg-brand-50/50 px-4 py-3 text-sm text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
        {mintStatus}
      </div>

      {activeTab === "minting" && (
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_450px]">
          {/* Left Column - Configuration */}
          <div className="space-y-8">
            {/* File Upload Section */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white">File Upload</h2>
                <p className="text-sm text-white/50">Choose a file and upload securely to proceed.</p>
              </div>

              <div
                className="group relative h-48 rounded-[20px] border border-dashed border-white/10 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]"
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileSelection}
                />
                <input
                  ref={metadataCsvInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleMetadataCsvUpload}
                />

                <div className="flex h-full gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                  {previewUrls.length === 0 ? (
                    <div
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40">
                        <PlusIcon className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-white/40">Upload Artworks</p>
                    </div>
                  ) : (
                    <>
                      {previewUrls.map((url, index) => (
                        <div
                          key={url}
                          className={`group relative aspect-square h-full shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                            previewIndex === index
                              ? "border-[#32AA00]"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                          onClick={() => setPreviewIndex(index)}
                        >
                          <img src={url} alt={`NFT ${index + 1}`} className="h-full w-full object-cover" />
                          {previewIndex === index && (
                            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#32AA00] text-white shadow-lg pointer-events-none">
                              <TickMarkIcon className="h-3 w-3" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemoveFile(index);
                            }}
                            className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all hover:bg-red-500 group-hover:opacity-100 shadow-xl border border-white/20"
                            aria-label="Remove image"
                          >
                            <CloseLineIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      <div
                        className="flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 transition-all hover:bg-white/10"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <PlusIcon className="h-5 w-5 text-white/40" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Inputs Section */}
            <div className="space-y-6">
              {/* Metadata CSV Upload Box */}
              <div className="relative rounded-[20px] border border-[#32AA00]/20 bg-[#121A15] p-6 shadow-theme-sm overflow-hidden group">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2 max-w-2xl">
                    <h3 className="text-base font-bold text-white tracking-tight">Metadata CSV</h3>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">
                      Upload a CSV using id,name,image_file,max_supply,usd,badge and an optional description column. Rows are matched to artwork by the image_file value.
                    </p>
                  </div>
                  <button
                    onClick={() => metadataCsvInputRef.current?.click()}
                    className="shrink-0 rounded-[14px] bg-[#1C2431] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#252D3B] shadow-xl border border-white/5 active:scale-95 whitespace-nowrap"
                  >
                    {metadataCsvName ? `Metadata: ${metadataCsvName}` : "Upload Metadata CSV"}
                  </button>
                </div>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#32AA00]/5 blur-[80px] rounded-full pointer-events-none" />
              </div>

              <Button
                variant="success"
                onClick={addAttribute}
                className="h-9 rounded-[10px] bg-[#32AA00] px-6 text-sm hover:bg-[#32AA00]/90 font-semibold"
              >
                Add Trait
              </Button>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">Name</Label>
                  <Input
                    placeholder="NFT name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-12 bg-[#0C0C11]/50 border-white/10 text-white placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">Description</Label>
                  <Textarea
                    placeholder="Enter your description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    className="bg-[#0C0C11]/50 border-white/10 text-white placeholder:text-white/20 rounded-[14px] resize-y"
                  />
                </div>

                <div className="space-y-4">
                  {attributes.map((attr, index) => (
                    <div key={`attr-${index}`} className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm font-semibold text-white">Trait</Label>
                        <Input
                          placeholder="Enter your trait"
                          value={attr.trait_type}
                          onChange={(e) => updateAttribute(index, "trait_type", e.target.value)}
                          className="h-12 bg-[#0C0C11]/50 border-white/10 text-white placeholder:text-white/20"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm font-semibold text-white">Value</Label>
                        <Input
                          placeholder="Value"
                          value={attr.value}
                          onChange={(e) => updateAttribute(index, "value", e.target.value)}
                          className="h-12 bg-[#0C0C11]/50 border-white/10 text-white placeholder:text-white/20"
                        />
                      </div>
                      <button
                        onClick={() => removeAttribute(index)}
                        className="mb-2 p-2 text-white/40 transition-colors hover:text-red-500"
                        aria-label="Remove trait"
                      >
                        <TrashBinIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issuance Quantity Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">Issuance Quantity</h3>
                  {editionType === "open" && (
                    <Badge variant="solid" className="bg-[#32AA00]/10 text-[#32AA00] border-transparent rounded-full px-4">
                      Open Edition
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 rounded-[20px] bg-white/5 p-1.5 w-fit">
                  {(["unique", "limited", "open"] as EditionType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEditionType(type)}
                      className={`h-11 rounded-[16px] px-8 text-sm font-medium capitalize transition-all ${
                        editionType === type
                          ? "bg-[#32AA00]/20 text-white border border-[#32AA00]/50 shadow-[0_0_20px_rgba(50,170,0,0.2)]"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {editionType === "open" && (
                  <p className="text-sm text-[#32AA00]">
                    Open edition mode is active in the UI. Supply enforcement still needs backend and contract wiring.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Preview Card */}
          <div className="sticky top-6 self-start">
            <div className="dashboard-card overflow-hidden !bg-[#090909]/40 p-6 space-y-8 backdrop-blur-xl border-white/5">
              {/* Preview Content */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <div className="aspect-square h-48 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    {currentPreview.url ? (
                      <img src={currentPreview.url} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/20">
                        No Artwork
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <h2 className="text-2xl font-bold text-white">{currentPreview.title || "Mixwell"}</h2>
                    <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                      {currentPreview.description || "Infinite Sunset (She can never leave the golden hour; her armor is perpetually warm, never cooling even in the void)"}
                    </p>
                  </div>
                </div>

                {/* Traits Summary Grid */}
                <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="border-r border-white/10 p-4">
                    <p className="text-xs font-semibold text-[#32AA00] uppercase tracking-wider mb-3">Traits</p>
                    <div className="space-y-1">
                      <p className="text-[11px] text-white/40 font-medium">Badge</p>
                      <p className="text-sm font-semibold text-white">
                        {attributes.find(a => a.trait_type.toLowerCase() === 'badge')?.value || "Gold Winged"}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-end">
                    <div className="space-y-1">
                      <p className="text-[11px] text-white/40 font-medium">Clothings</p>
                      <p className="text-sm font-semibold text-white">
                        {attributes.find(a => a.trait_type.toLowerCase() === 'clothings')?.value || "Leopard Hustle"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Network Details */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  {[
                    { label: "Network", value: `${mintChainLabel} (${mintChainId})` },
                    { label: "Contract Type", value: editionType === "unique" ? "ERC-721" : "ERC-1155" },
                    { label: "Queued Assets", value: previewUrls.length },
                    { label: "Recipient", value: account ? shortAddress(account) : "Wallet not connected" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-white/40">{item.label}</span>
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleMintClick}
                  variant="success"
                  className="w-full h-14 rounded-[16px] bg-[#32AA00] text-base font-bold shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] transition-all"
                >
                  Mint Assets
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "governance" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ComponentCard
            title="Global Compliance Switch"
            desc="UI-only controls for freeze state, signer management, and address restrictions."
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Transfers {transfersPaused ? "paused" : "active"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Toggle the global movement state without leaving the page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTransfersPaused((current) => !current)}
                  className={`relative h-8 w-16 rounded-full transition ${
                    transfersPaused ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                      transfersPaused ? "left-9" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Lookup Token or Address</Label>
                  <Input placeholder="Token ID or 0x address" />
                </div>
                <div>
                  <Label>Authorized Signer</Label>
                  <Input placeholder="0x backend signer address" />
                </div>
                <div>
                  <Label>Lock Token ID</Label>
                  <Input placeholder="1042" />
                </div>
                <div>
                  <Label>Unlock Schedule</Label>
                  <Input type="date" />
                </div>
                <div className="md:col-span-2">
                  <Label>Restrict Address</Label>
                  <Input placeholder="0x target wallet" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Verify Status</Button>
                <Button variant="primary">Update Signer</Button>
                <Button variant="destructive">Restrict Wallet</Button>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Granular Token Governance"
            desc="Mock per-token controls for allowlists, soulbound rules, and emergency burn actions."
          >
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Target Token ID</Label>
                  <Input placeholder="1045" />
                </div>
                <div>
                  <Label>Reference Address</Label>
                  <Input placeholder="0x allow or block address" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Soulbound Status",
                  "Allowlist Requirement",
                  "Address Permissions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-800 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {item}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Layout ready. Actions will be wired to smart contract
                        methods later.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                      <Button variant="primary" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  Danger Zone
                </p>
                <p className="mt-1 text-sm text-red-600 dark:text-red-200/80">
                  Burn UI is shown here, but no destructive action is connected
                  on this public route.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                  <Input placeholder="Token ID" />
                  <Input placeholder='Type "BURN" to confirm' />
                  <Button variant="destructive">Execute Burn</Button>
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}

      {activeTab === "tiers" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
          {tiers.map((tier) => {
            const progress = Math.min(
              100,
              Math.round((tier.minted / tier.maxSupply) * 100),
            );

            return (
              <ComponentCard
                key={tier.id}
                title={tier.name}
                desc={`Tier ID ${tier.id}`}
                className="relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge color={tier.paused ? "error" : "success"}>
                      {tier.paused ? "Paused" : "Live"}
                    </Badge>
                    <button
                      type="button"
                      onClick={() =>
                        setTiers((current) =>
                          current.map((item) =>
                            item.id === tier.id
                              ? { ...item, paused: !item.paused }
                              : item,
                          ),
                        )
                      }
                      className={`relative h-7 w-14 rounded-full transition ${
                        tier.paused
                          ? "bg-gray-300 dark:bg-gray-700"
                          : "bg-brand-500"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                          tier.paused ? "left-1" : "left-8"
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Circulation
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {tier.minted}/{tier.maxSupply}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>Max Supply</Label>
                      <Input
                        type="number"
                        defaultValue={tier.maxSupply}
                        onChange={(event) =>
                          setTiers((current) =>
                            current.map((item) =>
                              item.id === tier.id
                                ? {
                                    ...item,
                                    maxSupply: Number(event.target.value || 0),
                                  }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Base Metadata URI</Label>
                      <Input
                        defaultValue={tier.uri}
                        onChange={(event) =>
                          setTiers((current) =>
                            current.map((item) =>
                              item.id === tier.id
                                ? { ...item, uri: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                  </div>

                  <Button className="w-full">Sync Configuration</Button>
                </div>
              </ComponentCard>
            );
          })}

          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-white/[0.03]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
              <span className="text-2xl font-semibold">+</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Add New Tier
            </h3>
            <p className="mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              The shell is ready for a create-tier modal when you want the
              on-chain action added.
            </p>
          </div>
        </div>
      )}

      {activeTab === "collection" && (
        <div className="space-y-6">
          <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                Collection Matrix
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Filtered public registry preview for upcoming NFT minting
                inventory. Uploaded CSV metadata replaces the static mock
                registry automatically.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_180px]">
              <Input
                placeholder="Search by name or token ID"
                defaultValue={registrySearch}
                onChange={(event) => setRegistrySearch(event.target.value)}
              />
              <Select
                options={[
                  { value: "all", label: "All tiers" },
                  { value: "genesis", label: "Genesis" },
                  { value: "collector", label: "Collector" },
                  { value: "signature", label: "Signature" },
                ]}
                defaultValue={registryTierFilter}
                onChange={setRegistryTierFilter}
                placeholder="Filter tier"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-brand-200/40 bg-brand-50/50 p-4 dark:border-brand-500/20 dark:bg-brand-500/10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Referral Rewards Center
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
                12.40 ETH
              </p>
            </div>
            <Button>Claim Rewards</Button>
          </div>

          {filteredCollection.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-white/[0.03]">
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                No assets match the current filters.
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Adjust the registry search or tier filter to continue previewing
                the collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredCollection.map((asset) => (
                <div
                  key={asset.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {asset.image ? (
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Awaiting artwork upload for{" "}
                        {asset.imageFile ?? asset.name}
                      </div>
                    )}
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                          {asset.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Token #{asset.id}
                        </p>
                      </div>
                      <Badge color="primary">{asset.tier}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                          {asset.status}
                        </p>
                      </div>
                      <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Price
                        </p>
                        <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                          {asset.price}
                        </p>
                      </div>
                      <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Badge
                        </p>
                        <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                          {asset.badge ?? asset.owner}
                        </p>
                      </div>
                      <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Supply
                        </p>
                        <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                          {asset.maxSupply ?? "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">Purchase</Button>
                      <Button variant="outline" className="flex-1">
                        View Chain
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
