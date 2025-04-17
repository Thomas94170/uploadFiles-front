import { useState } from "react";
import { documentsByApproach, labelFileName, ResumeCase } from "../../public/faker/fakerDocuments";

export function FormResume({ resumeCase }: { resumeCase: ResumeCase }) {
  const expectedDocs = documentsByApproach[resumeCase.approach];
  const missingDocs = expectedDocs.filter((nameFile) => !resumeCase.fichiers[nameFile]);

  const [selectedFiles, setSelectedFiles] = useState<Partial<Record<string, File>>>({});
  const [sending, setSending] = useState(false);

  const handleFileChange = (nameFile: string, file: File) => {
    setSelectedFiles((prev) => ({ ...prev, [nameFile]: file }));
    console.log(`📥 ${nameFile} →`, file);
  };

  const handleSubmit = async () => {
    setSending(true);

    const formData = new FormData();
    formData.append("approach", resumeCase.approach); // optionnel si utilisé par l'API

    Object.entries(selectedFiles).forEach(([key, file]) => {
      formData.append(key, file);
      //a vérifier quand le back end sera présent, file ne peut pas etre undefined cote back end
      //
    });

    try {
      const res = await fetch(`/api/dossier/${resumeCase.id}/fichiers`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Tous les fichiers ont été envoyés !");
        // TODO : rafraîchir ou mettre à jour localement les fichiers
      } else {
        alert("❌ Erreur lors de l'envoi des fichiers");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Erreur réseau");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {missingDocs.length === 0 ? (
        <p className="text-green-600 font-medium">
          ✅ Tous les fichiers ont déjà été transmis.
        </p>
      ) : (
        <>
          <p className="text-black font-medium">
            Il vous reste à téléverser ces documents :
          </p>

          {missingDocs.map((nameFile) => (
            <div key={nameFile} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="sm:w-60 font-medium">{labelFileName[nameFile]}</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(nameFile, file);
                }}
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={sending || Object.keys(selectedFiles).length === 0}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
          >
            {sending ? "Envoi en cours..." : "Envoyer les documents"}
          </button>
        </>
      )}
    </div>
  );
}
