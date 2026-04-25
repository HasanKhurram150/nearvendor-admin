// "use client";

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { GenericModal } from "@/components/atoms/generic-modal";
// import Loading from "@/components/atoms/loading/loading";
// import Badge from "@/components/ui/badge/Badge";
// import Button from "@/components/ui/button/Button";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import TextArea from "@/components/form/input/TextArea";
// import toast from "react-hot-toast";
// // import {
// //   INftTraitInput,
// //   useGetNftByIdQuery,
// //   useUpdateNftMutation,
// // } from "@/services/nft-api";
// type INftTraitInput = any;

// const currencyFormatter = new Intl.NumberFormat("en-US", {
//   maximumFractionDigits: 2,
// });

// export default function NftDetailModal({
//   nftId,
//   isOpen,
//   onClose,
// }: {
//   nftId: string | null;
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formState, setFormState] = useState({
//     tokenId: "",
//     name: "",
//     description: "",
//     usdPrice: "",
//     ownerWalletAddress: "",
//     maxSupply: "",
//     season: "",
//     imageUri: "",
//     metadataUri: "",
//     externalUrl: "",
//     quantity: "1",
//     status: "uploaded",
//   });
//   const [traits, setTraits] = useState<INftTraitInput[]>([]);
//   // const {
//   //   data: nft,
//   //   isLoading,
//   //   isFetching,
//   //   isError,
//   // } = useGetNftByIdQuery(nftId as string, {
//   //   skip: !nftId || !isOpen,
//   // });
//   // const [updateNft, { isLoading: isUpdating }] = useUpdateNftMutation();
//   const nft: any = null;
//   const isLoading = false;
//   const isFetching = false;
//   const isError = false;
//   const [updateNft, { isLoading: isUpdating }] = [async (...args: any[]) => ({ unwrap: () => {} }), { isLoading: false }];

//   useEffect(() => {
//     if (!nft) {
//       return;
//     }

//     setFormState({
//       tokenId: nft.tokenId ?? "",
//       name: nft.name ?? "",
//       description: nft.description ?? "",
//       usdPrice: String(nft.usdPrice ?? ""),
//       ownerWalletAddress: nft.ownerWalletAddress ?? "",
//       maxSupply: String(nft.maxSupply ?? ""),
//       season: typeof nft.metadata?.season === "string" ? nft.metadata.season : "",
//       imageUri: nft.imageUri ?? "",
//       metadataUri: nft.metadataUri ?? "",
//       externalUrl: nft.externalUrl ?? "",
//       quantity: String(nft.quantity ?? 1),
//       status: nft.status ?? "uploaded",
//     });
//     setTraits(
//       nft.metadata?.attributes?.map((attribute) => ({
//         traitType: attribute.trait_type,
//         value: attribute.value,
//       })) ?? [],
//     );
//   }, [nft]);

//   const updateField = (field: keyof typeof formState, value: string) => {
//     setFormState((current) => ({ ...current, [field]: value }));
//   };

//   const updateTrait = (index: number, field: keyof INftTraitInput, value: string) => {
//     setTraits((current) =>
//       current.map((trait, currentIndex) =>
//         currentIndex === index ? { ...trait, [field]: value } : trait,
//       ),
//     );
//   };

//   const addTrait = () => {
//     setTraits((current) => [...current, { traitType: "", value: "" }]);
//   };

//   const removeTrait = (index: number) => {
//     setTraits((current) => current.filter((_, currentIndex) => currentIndex !== index));
//   };

//   const handleSave = async () => {
//     if (!nftId) {
//       return;
//     }

//     const parsedUsdPrice = Number(formState.usdPrice);
//     const parsedMaxSupply = Number(formState.maxSupply);
//     const parsedQuantity = Number(formState.quantity);

//     if (!formState.tokenId || !formState.name) {
//       toast.error("Token ID and name are required.");
//       return;
//     }

//     if (Number.isNaN(parsedUsdPrice) || Number.isNaN(parsedMaxSupply) || Number.isNaN(parsedQuantity)) {
//       toast.error("USD price, max supply, and quantity must be valid numbers.");
//       return;
//     }

//     try {
//       await updateNft({
//         id: nftId,
//         body: {
//           tokenId: formState.tokenId,
//           name: formState.name,
//           description: formState.description || undefined,
//           usdPrice: parsedUsdPrice,
//           ownerWalletAddress: formState.ownerWalletAddress || undefined,
//           maxSupply: parsedMaxSupply,
//           metadata: formState.season ? { season: formState.season } : undefined,
//           imageUri: formState.imageUri || undefined,
//           metadataUri: formState.metadataUri || undefined,
//           externalUrl: formState.externalUrl || undefined,
//           quantity: parsedQuantity,
//           status: formState.status || undefined,
//           traits: traits.filter((trait) => trait.traitType && trait.value),
//         },
//       }).unwrap();

//       toast.success("NFT updated successfully.");
//       setIsEditing(false);
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to update NFT.");
//     }
//   };

//   return (
//     <GenericModal isOpen={isOpen} onClose={onClose} maxWidth="72rem">
//       <div className="space-y-6 text-white/90">
//         <div className="flex items-start justify-between gap-4 pr-10">
//           <div>
//             <p className="text-sm uppercase tracking-[0.24em] text-white/60">
//               NFT Detail
//             </p>
//             <h2 className="mt-2 text-2xl font-semibold text-white">
//               {nft?.name ?? "Loading NFT..."}
//             </h2>
//             {nft?.id ? (
//               <p className="mt-1 text-sm text-white/70">{nft.id}</p>
//             ) : null}
//           </div>
//           {nft?.status ? (
//             <Badge color={nft.status === "uploaded" ? "success" : "light"}>
//               {nft.status}
//             </Badge>
//           ) : null}
//         </div>

//         {isLoading || isFetching ? (
//           <div className="flex min-h-[320px] items-center justify-center">
//             <Loading size="lg" className="text-brand-500" />
//           </div>
//         ) : isError || !nft ? (
//           <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center text-white/80">
//             Unable to load NFT detail.
//           </div>
//         ) : isEditing ? (
//           <div className="grid gap-6 ">
//             <div className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5">
//               <div className="grid gap-4 md:grid-cols-2">
//                 {/* <div>
//                   <Label className="text-white">Token ID</Label>
//                   <Input value={formState.tokenId} onChange={(event) => updateField("tokenId", event.target.value)} />
//                 </div> */}
//                 <div>
//                   <Label className="text-white">Name</Label>
//                   <Input value={formState.name} onChange={(event) => updateField("name", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">USD Price</Label>
//                   <Input type="number" value={formState.usdPrice} onChange={(event) => updateField("usdPrice", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">Max Supply</Label>
//                   <Input type="number" value={formState.maxSupply} onChange={(event) => updateField("maxSupply", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">Quantity</Label>
//                   <Input type="number" value={formState.quantity} onChange={(event) => updateField("quantity", event.target.value)} />
//                 </div>
//                 {/* <div>
//                   <Label className="text-white">Status</Label>
//                   <Input value={formState.status} onChange={(event) => updateField("status", event.target.value)} />
//                 </div> */}
//               </div>

//               <div>
//                 <Label className="text-white">Description</Label>
//                 <TextArea value={formState.description} onChange={(value) => updateField("description", value)} rows={4} />
//               </div>
//                 <div className="flex flex-wrap gap-3">
//                 <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isUpdating}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleSave} disabled={isUpdating}>
//                   {isUpdating ? "Saving..." : "Save Changes"}
//                 </Button>
//               </div>
//             </div>

//             {/* <div className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5">
//               <div className="grid gap-4">
//                 <div>
//                   <Label className="text-white">Owner Wallet Address</Label>
//                   <Input value={formState.ownerWalletAddress} onChange={(event) => updateField("ownerWalletAddress", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">Season Metadata</Label>
//                   <Input value={formState.season} onChange={(event) => updateField("season", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">Image URI</Label>
//                   <Input value={formState.imageUri} onChange={(event) => updateField("imageUri", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">Metadata URI</Label>
//                   <Input value={formState.metadataUri} onChange={(event) => updateField("metadataUri", event.target.value)} />
//                 </div>
//                 <div>
//                   <Label className="text-white">External URL</Label>
//                   <Input value={formState.externalUrl} onChange={(event) => updateField("externalUrl", event.target.value)} />
//                 </div>
//               </div>

//               <div>
//                 <div className="mb-3 flex items-center justify-between gap-3">
//                   <Label className="text-white">Traits</Label>
//                   <Button variant="outline" size="sm" onClick={addTrait}>Add Trait</Button>
//                 </div>
//                 <div className="space-y-3">
//                   {traits.map((trait, index) => (
//                     <div key={`${trait.traitType}-${index}`} className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
//                       <Input value={trait.traitType} onChange={(event) => updateTrait(index, "traitType", event.target.value)} placeholder="Trait type" />
//                       <Input value={trait.value} onChange={(event) => updateTrait(index, "value", event.target.value)} placeholder="Value" />
//                       <Button variant="destructive" size="sm" onClick={() => removeTrait(index)}>Remove</Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

            
//             </div> */}
//           </div>
//         ) : (
//           <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
//             <div className="space-y-4">
//               <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
//                 {nft.imageGatewayUrl ? (
//                   <img
//                     src={nft.imageGatewayUrl}
//                     alt={nft.name}
//                     className="aspect-square w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex aspect-square items-center justify-center text-sm text-white/60">
//                     No preview image
//                   </div>
//                 )}
//               </div>

//               {/* <div className="grid gap-3">
//                 {[
//                   { label: "Image URI", value: nft.imageUri },
//                   { label: "Metadata URI", value: nft.metadataUri },
//                   { label: "Transaction Hash", value: nft.txHash ?? "Not minted yet" },
//                   { label: "Owner", value: nft.ownerWalletAddress ?? "Unassigned" },
//                 ].map((item) => (
//                   <div
//                     key={item.label}
//                     className="rounded-2xl border border-white/10 bg-black/20 p-4"
//                   >
//                     <p className="text-xs uppercase tracking-wide text-white/50">
//                       {item.label}
//                     </p>
//                     <p className="mt-2 break-all text-sm text-white/90">{item.value}</p>
//                   </div>
//                 ))}
//               </div> */}
//             </div>

//             <div className="space-y-6">
//               <div className="grid gap-4 md:grid-cols-2">
//                 {[
//                   { label: "Token ID", value: `#${nft.tokenId}` },
//                   { label: "USD Price", value: `$${currencyFormatter.format(nft.usdPrice)}` },
//                   { label: "Badge", value: nft.badge },
//                   { label: "Max Supply", value: nft.maxSupply },
//                   { label: "Chain ID", value: nft.chainId },
               
//                   {
//                     label: "Created At",
//                     value: dayjs(nft.createdAt).format("DD MMM YYYY, HH:mm"),
//                   },
//                   {
//                     label: "Updated At",
//                     value: dayjs(nft.updatedAt).format("DD MMM YYYY, HH:mm"),
//                   },
//                 ].map((item) => (
//                   <div
//                     key={item.label}
//                     className="rounded-2xl border border-white/10 bg-black/20 p-4"
//                   >
//                     <p className="text-xs uppercase tracking-wide text-white/50">
//                       {item.label}
//                     </p>
//                     <p className="mt-2 text-base font-medium text-white">{item.value}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
//                 <p className="text-sm font-semibold text-white">Metadata Snapshot</p>
//                 <div className="mt-4 grid gap-4 md:grid-cols-2">
//                   {[
//                     { label: "Metadata Name", value: nft.metadata?.name ?? nft.name },
//                     {
//                       label: "Metadata USD",
//                       value: `$${currencyFormatter.format(nft.metadata?.usd ?? nft.usdPrice)}`,
//                     },
//                     { label: "Metadata Badge", value: nft.metadata?.badge ?? nft.badge },
//                     {
//                       label: "Metadata Supply",
//                       value: nft.metadata?.maxSupply ?? nft.maxSupply,
//                     },
//                   ].map((item) => (
//                     <div key={item.label}>
//                       <p className="text-xs uppercase tracking-wide text-white/50">
//                         {item.label}
//                       </p>
//                       <p className="mt-2 text-sm text-white/90">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-5">
//                   <p className="text-xs uppercase tracking-wide text-white/50">Attributes</p>
//                   {nft.metadata?.attributes?.length ? (
//                     <div className="mt-3 flex flex-wrap gap-3">
//                       {nft.metadata.attributes.map((attribute: { trait_type: string; value: string }) => (
//                         <div
//                           key={`${attribute.trait_type}-${attribute.value}`}
//                           className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
//                         >
//                           <p className="text-[11px] uppercase tracking-wide text-white/45">
//                             {attribute.trait_type}
//                           </p>
//                           <p className="mt-1 text-sm font-medium text-white">
//                             {attribute.value}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="mt-3 text-sm text-white/70">No metadata attributes available.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <Button onClick={() => setIsEditing(true)}>Edit NFT</Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => window.open(nft.imageGatewayUrl, "_blank", "noopener,noreferrer")}
//                 >
//                   Open Image
//                 </Button>
//                 {nft.metadataGatewayUrl ? (
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       const metadataUrl = nft.metadataGatewayUrl;

//                       if (!metadataUrl) {
//                         return;
//                       }

//                       window.open(metadataUrl, "_blank", "noopener,noreferrer");
//                     }}
//                   >
//                     Open Metadata
//                   </Button>
//                 ) : null}
//                 <Button onClick={onClose}>Close</Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </GenericModal>
//   );
// }
