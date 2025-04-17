export type ApproachType = 'CARTE_GRISE' | 'DUPLICATA' | 'PERMIS_CONDUIRE' | 'AUTRE';

export type NameFile =
  | 'CESSION_VEHICULE'
  | 'CNI_RECTO'
  | 'CNI_VERSO'
  | 'QUITTANCE_LOYER'
  | 'DECLARATION_PERTE'
  | 'JUSTIFICATIF_DOMICILE'
  | 'PHOTO_IDENTITE'
  | 'PERMIS_CONDUIRE'
  | 'JUSTIFICATIF_ASSURANCE';

  export const documentsByApproach: Record<ApproachType, NameFile[]> = {
    CARTE_GRISE: ['CESSION_VEHICULE', 'CNI_RECTO', 'CNI_VERSO', 'QUITTANCE_LOYER'],
    DUPLICATA: ['DECLARATION_PERTE', 'CNI_RECTO', 'CNI_VERSO'],
    PERMIS_CONDUIRE: ['PHOTO_IDENTITE', 'JUSTIFICATIF_DOMICILE'],
    AUTRE: []
  };

export const nameOfApproach: Record<ApproachType, string> = {
  CARTE_GRISE: 'Carte grise',
  DUPLICATA: 'Duplicata',
  PERMIS_CONDUIRE: 'Permis de conduire',
  AUTRE: 'Autre'
};

export const approach: ApproachType[] = ['CARTE_GRISE', 'DUPLICATA', 'PERMIS_CONDUIRE', 'AUTRE'];

export const labelFileName: Record<NameFile, string> = {
    CESSION_VEHICULE: "Certificat de cession du véhicule",
    CNI_RECTO: "Carte d'identité - Recto",
    CNI_VERSO: "Carte d'identité - Verso",
    QUITTANCE_LOYER: "Quittance de loyer",
    DECLARATION_PERTE: "Déclaration de perte",
    JUSTIFICATIF_DOMICILE: "Justificatif de domicile",
    PHOTO_IDENTITE: "Photo d'identité",
    PERMIS_CONDUIRE: "Permis de conduire",
    JUSTIFICATIF_ASSURANCE: "Justificatif d assurance"
    }

    export type ResumeCase = {
        id: string;
        approach: ApproachType;
        fichiers: Partial<Record<NameFile, string>>; // url du fichier déjà uploadé
      };

      export const fakeCaseInProgress: ResumeCase [] = [
        {
          id: "ABC123456",
          approach: "CARTE_GRISE",
          fichiers: {
            CNI_RECTO: "https://example.com/cni-recto.pdf",
            CNI_VERSO: "https://example.com/cni-verso.pdf"
          }
        },
        {
          id: "XYZ789101",
          approach: "DUPLICATA",
          fichiers: {
            DECLARATION_PERTE: "https://example.com/perte.pdf"
          }
        }
      ];