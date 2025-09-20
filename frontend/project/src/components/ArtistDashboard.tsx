// import React, { useState } from "react";
// import { Plus, Mic, X } from "lucide-react";
// import axios from "axios";
// import type { Product, User } from "../types/index.ts";
// import { Dialog } from "@headlessui/react";

// interface ArtistDashboardProps {
//   currentUser: User | null;
//   products: Product[];
//   onAddProduct: (
//     product: Omit<Product, "id" | "artistId" | "createdAt">
//   ) => void;
// }

// const API_BASE = "http://127.0.0.1:5000";

// export function ArtistDashboard({
//   currentUser,
//   products,
//   onAddProduct,
// }: ArtistDashboardProps) {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     tags: "",
//     language: "en",
//   });
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [audioURL, setAudioURL] = useState<string | null>(null);
//   const [recording, setRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Detail modal state
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   // Toggle recording
//   const toggleRecording = async () => {
//     if (recording) {
//       mediaRecorder?.stop();
//       setRecording(false);
//     } else {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         const recorder = new MediaRecorder(stream);
//         setMediaRecorder(recorder);
//         const chunks: BlobPart[] = [];

//         recorder.ondataavailable = (e) => chunks.push(e.data);

//         recorder.onstop = async () => {
//           const audioBlob = new Blob(chunks, { type: "audio/wav" });
//           setAudioURL(URL.createObjectURL(audioBlob));
//           await uploadAudio(audioBlob);
//         };

//         recorder.start();
//         setRecording(true);
//       } catch (error) {
//         alert("Microphone access denied.");
//       }
//     }
//   };

//   // Upload audio to backend and update description
//   const uploadAudio = async (audioBlob: Blob) => {
//     try {
//       setLoading(true);
//       const formDataUpload = new FormData();
//       formDataUpload.append("file", audioBlob, "recorded_audio.wav");
//       formDataUpload.append("language", formData.language);
//       formDataUpload.append("mode", "description");

//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to generate content.");
//         return;
//       }

//       const res = await axios.post(
//         `${API_BASE}/content/voice-generate`,
//         formDataUpload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       // Auto-fill description field
//       setFormData((prev) => ({
//         ...prev,
//         description: res.data.generated_text,
//       }));
//     } catch (err: any) {
//       console.error("Error uploading audio:", err.response?.data || err.message);
//       alert("Failed to generate description from voice. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle image selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedImages(Array.from(e.target.files));
//     }
//   };

//   // Form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newProduct: Omit<Product, "id" | "artistId" | "createdAt"> = {
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       images: selectedImages.map((file) => URL.createObjectURL(file)),
//       audio: audioURL || null,
//       category: formData.category,
//       tags: formData.tags.split(",").map((tag) => tag.trim()),
//       aiGenerated: false,
//       likes: 0,
//       views: 0,
//     };
//     onAddProduct(newProduct);
//     // Reset form
//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       category: "",
//       tags: "",
//       language: "en",
//     });
//     setSelectedImages([]);
//     setAudioURL(null);
//     setShowAddForm(false);
//   };

//   if (!currentUser?.isArtist) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
//         <p className="text-gray-600">
//           You need to be registered as an artist to access the dashboard.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Artist Dashboard</h1>
//           <p className="text-gray-600">Manage your artwork and track performance</p>
//         </div>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
//         >
//           <Plus className="h-5 w-5 mr-2" /> Add Artwork
//         </button>
//       </div>

//       {/* Add Artwork Form */}
//       {showAddForm && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h3 className="text-lg font-semibold mb-4">Add New Artwork</h3>
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, name: e.target.value }))
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price ($)
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, price: e.target.value }))
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             {/* Voice Recording */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Record Your Voice
//               </label>
//               <button
//                 type="button"
//                 onClick={toggleRecording}
//                 className={`flex items-center px-4 py-2 rounded-md ${
//                   recording ? "bg-red-500" : "bg-purple-600"
//                 } text-white`}
//               >
//                 <Mic className="h-4 w-4 mr-2" />
//                 {recording ? "Stop Recording" : "Start Recording"}
//               </button>
//               {audioURL && (
//                 <audio controls src={audioURL} className="mt-2 w-full"></audio>
//               )}
//               {loading && (
//                 <p className="text-sm text-gray-500 mt-2">
//                   Processing voice input...
//                 </p>
//               )}
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 required
//                 rows={3}
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     description: e.target.value,
//                   }))
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             {/* Language Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Language
//               </label>
//               <select
//                 value={formData.language}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     language: e.target.value,
//                   }))
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="en">English</option>
//                 <option value="hi">Hindi</option>
//                 <option value="es">Spanish</option>
//                 <option value="fr">French</option>
//                 <option value="de">German</option>
//               </select>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category
//               </label>
//               <select
//                 required
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, category: e.target.value }))
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="">Select category</option>
//                 <option value="Digital Art">Digital Art</option>
//                 <option value="Oil Painting">Oil Painting</option>
//                 <option value="Mixed Media">Mixed Media</option>
//                 <option value="Abstract">Abstract</option>
//                 <option value="Photography">Photography</option>
//               </select>
//             </div>

//             {/* Tags */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tags (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.tags}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, tags: e.target.value }))
//                 }
//                 placeholder="abstract, modern, colorful"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Choose Photo
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full"
//               />
//               {selectedImages.length > 0 && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   {selectedImages.length} file(s) selected
//                 </p>
//               )}
//             </div>

//             <div className="md:col-span-2 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowAddForm(false)}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
//               >
//                 Add Artwork
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             onClick={() => setSelectedProduct(product)}
//             className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
//           >
//             <img
//               src={product.images[0]}
//               alt={product.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
//               <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                 {product.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Detail Modal */}
//       {selectedProduct && (
//         <Dialog
//           open={true}
//           onClose={() => setSelectedProduct(null)}
//           className="relative z-50"
//         >
//           <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
//           <div className="fixed inset-0 flex items-center justify-center p-4">
//             <Dialog.Panel className="mx-auto max-w-lg bg-white rounded-lg shadow-xl p-6 relative">
//               <button
//                 onClick={() => setSelectedProduct(null)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//               >
//                 <X className="h-5 w-5" />
//               </button>

//               <Dialog.Title className="text-xl font-bold mb-4">
//                 {selectedProduct.name}
//               </Dialog.Title>

//               <img
//                 src={selectedProduct.images[0]}
//                 alt={selectedProduct.name}
//                 className="w-full h-64 object-cover rounded-md mb-4"
//               />

//               <p className="text-gray-700 mb-2">
//                 <strong>Description:</strong> {selectedProduct.description}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Category:</strong> {selectedProduct.category}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Price:</strong> ${selectedProduct.price}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Tags:</strong> {selectedProduct.tags.join(", ")}
//               </p>

           
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       )}
//     </div>
//   );
// }

// src/components/ArtistDashboard.tsx
// import React, { useState, useEffect } from "react";
// import { Plus, Mic } from "lucide-react";
// import type { Product, User } from "../types/index.ts";
// import { addCard, getMyCards } from "../services/api.ts";

// interface ArtistDashboardProps {
//   currentUser: User | null;
// }

// export function ArtistDashboard({ currentUser }: ArtistDashboardProps) {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     tags: "",
//     language: "en",
//   });
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [audioURL, setAudioURL] = useState<string | null>(null);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [recording, setRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedCard, setSelectedCard] = useState<Product | null>(null);


//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     if (currentUser) fetchCards();
//   }, [currentUser]);

//   const fetchCards = async () => {
//     try {
//       const data = await getMyCards();
//       const mapped: Product[] = data.map((c: any) => ({
//         id: c._id,
//         userId: c.user_id,
//         name: c.title,
//         description: c.description,
//         price: c.price,
//         images: c.image_url ? [c.image_url] : [], // ✅ wrap into array
//         audio: c.audio || null,
//         category: c.category,
//         tags: c.tags || [],
//         aiGenerated: c.aiGenerated ?? false,
//         likes: c.likes ?? 0,
//         views: c.views ?? 0,
//         createdAt: c.created_at,
//       }));
//       setProducts(mapped);
//     } catch (err) {
//       console.error("Failed to fetch cards:", err);
//     }
//   };

//   // 🎤 Recording
//   const toggleRecording = async () => {
//     if (recording) {
//       mediaRecorder?.stop();
//       setRecording(false);
//       setMediaRecorder(null);
//       return;
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       const chunks: BlobPart[] = [];

//       recorder.ondataavailable = (e) => chunks.push(e.data);

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "audio/wav" });
//         setAudioBlob(blob);
//         setAudioURL(URL.createObjectURL(blob));
//         stream.getTracks().forEach((t) => t.stop());
//       };

//       recorder.start();
//       setRecording(true);
//     } catch (err) {
//       alert("Microphone access denied or not available.");
//     }
//   };

//   // 📸 Handle Image Selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) setSelectedImages(Array.from(e.target.files));
//   };

//   // ➕ Add artwork
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const tagsArray =
//         formData.tags && formData.tags.trim()
//           ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
//           : [];

//       // For now, just take the first image and set as URL string (backend expects string)
//       const imageFile = selectedImages.length > 0 ? selectedImages[0] : null;

//       // ⬇️ placeholder (you should upload to server/cloud & get URL back)
//       const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "";

//       const newCard = {
//         title: formData.title,
//         description: formData.description,
//         price: parseFloat(formData.price || "0"),
//         image_url: imageUrl, // ✅ backend expects string
//         category: formData.category,
//         tags: tagsArray,
//         audio: null,
//       };

//       await addCard(newCard);

//       // Refresh
//       await fetchCards();

//       // reset form
//       setShowAddForm(false);
//       setFormData({
//         title: "",
//         description: "",
//         price: "",
//         category: "",
//         tags: "",
//         language: "en",
//       });
//       setSelectedImages([]);
//       setAudioBlob(null);
//       setAudioURL(null);
//     } catch (err) {
//       console.error("Failed to add card:", err);
//       alert("Failed to add artwork. See console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!currentUser?.isArtist) {
//     return (
//       <div className="text-center py-16">
//         <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
//         <p>You need to be registered as an artist to access the dashboard.</p>
//       </div>
//     );
//   }

//    return (
//    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-pink-300 to-blue-300">
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-100 via-pink-600 to-blue-900 bg-clip-text text-transparent drop-shadow-lg">
//           Artist Dashboard
//         </h1>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-3 rounded-xl flex items-center font-semibold shadow-lg hover:scale-105 transform transition-all"
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Add Artwork
//         </button>
//       </div>

//     {/* Modal Form */}
//     {showAddForm && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//         <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border border-purple-300">
//           {/* Close button */}
//           <button
//             type="button"
//             onClick={() => setShowAddForm(false)}
//             className="absolute top-4 right-4 text-pink-700 text-2xl hover:text-red-500"
//           >
//             ✕
//           </button>

//           <h3 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-400 drop-shadow">
//             🎨 Add New Artwork
//           </h3>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     title: e.target.value,
//                   }))
//                 }
//                 placeholder="Enter artwork name"
//                 className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
//               />
//             </div>

//             {/* Price */}
//             <div>
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Price ($)
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     price: e.target.value,
//                   }))
//                 }
//                 placeholder="Enter price"
//                 className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
//               />
//             </div>

//             {/* Recording */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Record Your Voice
//               </label>
//               <button
//                 type="button"
//                 onClick={toggleRecording}
//                 className={`flex items-center px-5 py-3 rounded-xl font-semibold ${
//                   recording
//                     ? "bg-red-500 hover:bg-red-600"
//                     : "bg-gradient-to-r from-pink-500 to-red-400 hover:opacity-90"
//                 } text-white shadow-lg transition-all`}
//               >
//                 <Mic className="h-5 w-5 mr-2" />
//                 {recording ? "Stop Recording" : "Start Recording"}
//               </button>
//               {audioURL && (
//                 <audio
//                   controls
//                   src={audioURL}
//                   className="mt-3 w-full rounded-lg"
//                 ></audio>
//               )}
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 required
//                 rows={3}
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     description: e.target.value,
//                   }))
//                 }
//                 placeholder="Describe your artwork..."
//                 className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Category
//               </label>
//               <select
//                 required
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     category: e.target.value,
//                   }))
//                 }
//                 className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 focus:ring-2 focus:ring-pink-400 outline-none"
//               >
//                 <option value="">Select category</option>
//                 <option value="Digital Art">Digital Art</option>
//                 <option value="Oil Painting">Oil Painting</option>
//                 <option value="Mixed Media">Mixed Media</option>
//                 <option value="Abstract">Abstract</option>
//                 <option value="Photography">Photography</option>
//               </select>
//             </div>

//             {/* Tags */}
//             <div>
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Tags (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 value={formData.tags}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, tags: e.target.value }))
//                 }
//                 placeholder="abstract, modern, colorful"
//                 className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
//               />
//             </div>

//             {/* Image Upload */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-pink-700 mb-2">
//                 Choose Photo
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-400 file:to-red-400 file:text-white hover:file:opacity-90 cursor-pointer"
//               />
//               {selectedImages.length > 0 && (
//                 <p className="text-xs text-pink-600 mt-1">
//                   {selectedImages.length} file(s) selected
//                 </p>
//               )}
//             </div>

//             {/* Buttons */}
//             <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowAddForm(false)}
//                 className="px-5 py-2 rounded-xl font-semibold text-pink-600 border border-pink-400 hover:bg-pink-100 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 disabled={loading}
//                 type="submit"
//                 className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 hover:scale-105 transition-all shadow-lg"
//               >
//                 {loading ? "Uploading..." : " Add Artwork"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )}

//     {/* Product Grid */}
//    {/* Product Grid */}
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {products.map((p, idx) => {
//     // Pick gradient based on index (rotating)
//     const gradients = [
//       "bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200",
//       "bg-gradient-to-br from-purple-100 via-pink-200 to-purple-300",
//       "bg-gradient-to-br from-orange-100 via-pink-100 to-red-100",
//       "bg-gradient-to-br from-pink-200 via-red-100 to-yellow-100",
//       "bg-gradient-to-br from-purple-200 via-pink-200 to-blue-100",
//     ];
//     const cardBg = gradients[idx % gradients.length];

//     return (
//       <div
//           key={p.id}
//           onClick={() => setSelectedCard(p)}
//           className={`${cardBg} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer`}
//       >
//         {p.images.length > 0 && (
//           <img
//             src={p.images[0]}
//             alt={p.name}
//             className="w-full h-48 object-cover"
//           />
//         )}
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-2">{p.name}</h3>
//           <p className="text-gray-700 text-sm mb-3 line-clamp-2">
//             {p.description}
//           </p>
//           <p className="text-purple-700 font-semibold">${p.price}</p>
//         </div>
//       </div>
//     );
//   })}
// </div>

// </div>.
// </div>
// );
// }

// ArtistDashboard.tsx
import React, { useState, useEffect } from "react";
import { Plus, Mic } from "lucide-react";
import type { Product, User } from "../types/index.ts";
import { addCard, getMyCards } from "../services/api.ts";

interface ArtistDashboardProps {
  currentUser: User | null;
}

export function ArtistDashboard({ currentUser }: ArtistDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    language: "en",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (currentUser) fetchCards();
  }, [currentUser]);

  const fetchCards = async () => {
    try {
      const data = await getMyCards();
      const mapped: Product[] = data.map((c: any) => ({
        id: c._id,
        userId: c.user_id,
        name: c.title,
        description: c.description,
        price: c.price,
        image_url: c.image_url || "",
        category: c.category,
        tags: c.tags || [],
        createdAt: c.created_at,
      }));
      setProducts(mapped);
    } catch (err) {
      console.error("Failed to fetch cards:", err);
    }
  };

  // Recording
  const toggleRecording = async () => {
    if (recording) {
      mediaRecorder?.stop();
      setRecording(false);
      setMediaRecorder(null);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      alert("Microphone access denied or not available.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedImages(Array.from(e.target.files));
  };

  // Add artwork
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const tagsArray =
        formData.tags && formData.tags.trim()
          ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [];
      const imageFile = selectedImages[0];
      const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "";

      const newCard: Product = {
        id: Date.now().toString(), // temp ID for immediate display
        name: formData.title,
        description: formData.description,
        price: parseFloat(formData.price || "0"),
        image_url: imageUrl,
        category: formData.category,
        tags: tagsArray,
        userId: currentUser?.id || "",
        createdAt: new Date().toISOString(),
      };

      // Add immediately for instant modal reflection
      setProducts((prev) => [newCard, ...prev]);

      // Send to backend
      await addCard(newCard);
      await fetchCards();

      setShowAddForm(false);
      setFormData({ title: "", description: "", price: "", category: "", tags: "", language: "en" });
      setSelectedImages([]);
      setAudioBlob(null);
      setAudioURL(null);
    } catch (err) {
      console.error("Failed to add card:", err);
      alert("Failed to add artwork. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser?.isArtist) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>You need to be registered as an artist to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-pink-300 to-blue-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-100 via-pink-600 to-blue-900 bg-clip-text text-transparent drop-shadow-lg">
            Artist Dashboard
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-3 rounded-xl flex items-center font-semibold shadow-lg hover:scale-105 transform transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Artwork
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border border-purple-300">
              <button type="button" onClick={() => setShowAddForm(false)} className="absolute top-4 right-4 text-pink-700 text-2xl hover:text-red-500">
                ✕
              </button>
              <h3 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-400 drop-shadow">
                🎨 Add New Artwork
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Name</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} placeholder="Enter artwork name" className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none" />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Price ($)</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} placeholder="Enter price" className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none" />
                </div>

                {/* Recording */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Record Your Voice</label>
                  <button type="button" onClick={toggleRecording} className={`flex items-center px-5 py-3 rounded-xl font-semibold ${recording ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-pink-500 to-red-400 hover:opacity-90"} text-white shadow-lg transition-all`}>
                    <Mic className="h-5 w-5 mr-2" />
                    {recording ? "Stop Recording" : "Start Recording"}
                  </button>
                  {audioURL && <audio controls src={audioURL} className="mt-3 w-full rounded-lg"></audio>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Describe your artwork..." className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none" />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Category</label>
                  <select required value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 focus:ring-2 focus:ring-pink-400 outline-none">
                    <option value="">Select category</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Oil Painting">Oil Painting</option>
                    <option value="Mixed Media">Mixed Media</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Tags (comma-separated)</label>
                  <input type="text" value={formData.tags} onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))} placeholder="abstract, modern, colorful" className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-gray-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none" />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-pink-700 mb-2">Choose Photo</label>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-400 file:to-red-400 file:text-white hover:file:opacity-90 cursor-pointer" />
                  {selectedImages.length > 0 && <p className="text-xs text-pink-600 mt-1">{selectedImages.length} file(s) selected</p>}
                </div>

                {/* Buttons */}
                <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-5 py-2 rounded-xl font-semibold text-pink-600 border border-pink-400 hover:bg-pink-100 transition-all">Cancel</button>
                  <button disabled={loading} type="submit" className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 hover:scale-105 transition-all shadow-lg">{loading ? "Uploading..." : " Add Artwork"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Grid */}
       {/* Product Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((p, idx) => {
    const gradients = [
      "bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200",
      "bg-gradient-to-br from-purple-100 via-pink-200 to-purple-300",
      "bg-gradient-to-br from-orange-100 via-pink-100 to-red-100",
      "bg-gradient-to-br from-pink-200 via-red-100 to-yellow-100",
      "bg-gradient-to-br from-purple-200 via-pink-200 to-blue-100",
    ];
    const cardBg = gradients[idx % gradients.length];

    return (
      <div
        key={p.id}
        onClick={() => setSelectedCard(p)}
        className={`${cardBg} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer`}
      >
        {p.image_url && (
          <img
            src={p.image_url}
            alt={p.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{p.name}</h3>
          <p className="text-gray-700 text-sm mb-2 line-clamp-2">{p.description}</p>
          <p className="text-purple-700 font-semibold mb-2">${p.price}</p>

          {/* Tags on card */}
          {p.tags && p.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>


        {/* Card Modal */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCard.name}</h2>
                <button onClick={() => setSelectedCard(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">✕</button>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Image */}
                  <div>
                    <img src={selectedCard.image_url} alt={selectedCard.name} className="w-full rounded-lg shadow-lg mb-4 object-cover" />
                  </div>

                  {/* Right: Details */}
                  <div>
                    <div className="mb-6">
                      {/* Price */}
                      <div className="text-3xl font-bold text-gray-900 mb-4">${selectedCard.price}</div>

                      {/* Description */}
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">{selectedCard.description}</p>

                      {/* Category */}
                      {selectedCard.category && (
                        <div className="mb-4">
                          <span className="font-semibold text-gray-700">Category: </span>
                          <span className="text-gray-600">{selectedCard.category}</span>
                        </div>
                      )}

                      {/* Tags */}
                      {selectedCard.tags && selectedCard.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedCard.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#{tag}</span>
                          ))}
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex space-x-3">
                        <button onClick={() => { setProducts(prev => prev.filter(p => p.id !== selectedCard.id)); setSelectedCard(null); }} className="flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition-all flex justify-center items-center">Delete</button>
                        <button onClick={() => { alert("Added to marketplace! 🚀"); setSelectedCard(null); }} className="flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-3 rounded-xl flex items-center font-semibold shadow-lg hover:scale-105 transform transition-all">Add to Marketplace</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
