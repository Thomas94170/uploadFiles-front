import { useState } from 'react'
import './App.css'
import { YourSituation } from './component/YourSituation'
import ApproachForm from './component/ApproachForm'
import { FormResume } from './component/FormResume'
import type { ResumeCase } from '../public/faker/fakerDocuments'
import { fakeCaseInProgress } from '../public/faker/fakerDocuments'

function App() {
  
  const [formType, setFormType] = useState<"first" | "second" | null>(null);
  const [resumeId, setResumeId] = useState("");
  const [selectedCase, setSelectedCase] = useState<ResumeCase | null>(null);
  const [error, setError] = useState<string | null>(null);



  const handleSituationSelect = (situation: "first" | "second") => {
  setFormType(situation);
  setResumeId("");
  setSelectedCase(null);
  setError(null);
};

const handleValidateId = () => {
  const found = fakeCaseInProgress.find((c) => c.id === resumeId.trim());

  if (found) {
    setSelectedCase(found);
    setError(null);
  } else {
    setSelectedCase(null);
    setError("Identifiant non valide");
  }
};

const handleCancel = () => {
  setFormType(null);
  setResumeId("");
  setSelectedCase(null);
  setError(null);
};
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Démarche administrative
      </h1>
<YourSituation onSelect={handleSituationSelect} />

{formType === "first" && (
  <div className="space-y-4">
    <ApproachForm />
    <button
      onClick={handleCancel}
      className="text-sm text-gray-500 underline hover:text-gray-700"
    >
      Annuler
    </button>
  </div>
)}

{formType === "second" && (
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Entrez votre identifiant de dossier"
      value={resumeId}
      onChange={(e) => setResumeId(e.target.value)}
      className="w-full border border-gray-300 px-4 py-2 rounded-md"
    />
    <button
      onClick={handleValidateId}
      className="bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto"
    >
      Reprendre ma démarche
    </button>

    {error && <p className="text-red-600 text-sm">{error}</p>}

    {selectedCase && (
      <div className="space-y-4">
        <FormResume resumeCase={selectedCase} />
        <button
      onClick={handleCancel}
      className="text-sm text-gray-500 underline hover:text-gray-700"
    >
      Annuler
    </button>
      </div>
    )}
  </div>
)}
</div>
</div>
    </>
  )
}

export default App
