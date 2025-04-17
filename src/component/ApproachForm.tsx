import React, { useState } from "react";
import { Button, Menu, MenuHandler, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { ApproachType, documentsByApproach, labelFileName, NameFile } from "../../public/faker/fakerDocuments";

export default function ApproachForm() {
  const [selectedApproach, setSelectedApproach] = useState<ApproachType | null>(null);
  const [fichiers, setFichiers] = useState<Record<NameFile, File>>({});
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFileChange = (nameFile: NameFile, file: File) => {
    setFichiers((prev) => {
      const updated = { ...prev, [nameFile]: file };
      console.log(`📥 Fichier sélectionné pour ${nameFile} :`, file);
      console.log("🗂️ État actuel des fichiers :", updated);
      return updated;
    });
  };
  const handleSubmit = async () => {
    if (!selectedApproach || !isValidEmail(email)) return;
  
    const formData = new FormData();
    formData.append("demarche", selectedApproach);
    formData.append("email", email); // très important
  
    Object.entries(fichiers).forEach(([nameFile, file]) => {
      if (file) formData.append(nameFile, file);
    });
  
    const res = await fetch(`/api/dossier`, {
      method: "POST",
      body: formData
    });
  
    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Erreur lors de l'envoi du dossier.");
    }
  };
  

  return (
    <div className="p-4 space-y-6">
      

      <Menu>
        <MenuHandler>
          <Button className="bg-black text-white rounded-md px-4 py-2">
            {selectedApproach ? labelFileName[selectedApproach] : "Choisir la démarche"}
          </Button>
        </MenuHandler>
        <MenuList>
          {Object.keys(documentsByApproach).map((approach) => (
            <MenuItem key={approach} onClick={() => {
              setSelectedApproach(approach as ApproachType);
              setFichiers({}); // reset fichiers à chaque changement
            }}>
              {approach.replace("_", " ").toLowerCase()}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Affichage des fichiers nécessaires */}
      {selectedApproach && !submitted && (
        <div className="space-y-4">
          {documentsByApproach[selectedApproach].map((docKey) => (
            <div key={docKey} className="flex flex-col gap-2">
              <Typography variant="small" className="mb-1 font-medium">
                {labelFileName[docKey]}
              </Typography>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(docKey, file);
                }}
              />
            </div>
          ))}
  <div className="mb-4">
  <Typography variant="small" className="mb-1 font-medium">
    Adresse email (obligatoire)
  </Typography>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border border-gray-300 px-4 py-2 rounded-md"
    placeholder="exemple@email.com"
  />
  {!isValidEmail(email) && email.length > 0 && (
    <p className="text-red-600 text-sm mt-1">Adresse email invalide</p>
  )}
</div>
          {/* Bouton d'envoi */}
          {!submitted && (
  <Button className="bg-black text-white rounded-md px-4 py-2" onClick={handleSubmit} >
    Envoyer le dossier
  </Button>
)}
          {submitted && (
  <p className="text-green-700 font-medium">
    ✅ Votre dossier a été envoyé. Vous allez recevoir un mail avec votre identifiant unique.
  </p>
)}
        </div>
      )}
    </div>
  );
}
