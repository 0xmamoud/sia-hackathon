export type Label = {
    page: number;
    x: number;
    y: number;
    name: string;
    id: string;
    fontSize: number;
    color: string;
  };
  
export type AuditCase = {
    prompt: string;
    labels: Label[];
};


  
export const auditCase: AuditCase[] = [
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux parties engagées et aux locaux loués(si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 0,
                x: 187,
                y: 697,
                name: "Le nom du Bailleur et son numéro RCS (si applicable)",
                id: "element_1",
                fontSize: 10,
                color: "black"
            },
            {
                page: 0,
                x: 187,
                y: 667,
                name: "Le nom du Preneur et son numéro RCS (si applicable)",
                id: "element_2",
                fontSize: 10,
                color: "black"
            },
            {
                page: 0,
                x: 187,
                y: 627,
                name: "Déterminez si le bail mentionne une cession du droit au bail par le Preneur d'origine. Si oui, identifiez le nom du cessionnaire (nouveau Preneur). Si non, indiquez seulement 'non'",
                id: "element_3",
                fontSize: 10,
                color: "black"
            },
            {
                page: 0,
                x: 187,
                y: 537,
                name: "L'adresse du ou des locaux loués",
                id: "element_4",
                fontSize: 10,
                color: "black"
            },
            {
                page: 0,
                x: 187,
                y: 511,
                name: "Le nombre total de m² et emplacements de stationnement et, le cas échéant, la répartition par type de surfaces, les droits de jouissance partagés spécifiques et/ou les servitudes grevant les Locaux Loués ou dont bénéficie le Preneur. Précisez si Quote-part de parties communes incluse (oui ou non).",
                id: "element_5",
                fontSize: 10,
                color: "black"
            },
            {
                page: 0,
                x: 187,
                y: 430,
                name: "Le Droit d'accès au RIE (si oui, préciser)",
                id: "element_6",
                fontSize: 10,
                color: "blue"
            },
            {
                page: 0,
                x: 187,
                y: 400,
                name: "La destination des locaux loués les activités autorisées.",
                id: "element_7",
                fontSize: 10,
                color: "black"
            },
            {
                page: 0,
                x: 187,
                y: 345,
                name: "Existe t il une clause d'exclusivité (exclusivité consentie par le Bailleur au Preneur) ? Si oui précisez.",
                id: "element_8",
                fontSize: 10,
                color: "red"
            },
            {
                page: 0,
                x: 187,
                y: 320,
                name: "Existe t il une clause de non concurrence (clause de non concurrence à la charge du Preneur (i.e. le Preneur s’interdit d’implanter un autre local à proximité des Locaux Loués et dans lequel il exercerait la même activité) ? Si oui précisez.",
                id: "element_9",
                fontSize: 10,
                color: "red"
            }
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux questions capacitaires et aux ERP (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 0,
                x: 187,
                y: 260,
                name: "Existe t il une clause relative au capacitaire des locaux loués ? Si oui précisez.",
                id: "element_10",
                fontSize: 10,
                color: "blue"
            },
            {
                page: 0,
                x: 187,
                y: 215,
                name: "Existe t il une clause relative au classement des locaux loués en ERP ? Si oui précisez.",
                id: "element_11",
                fontSize: 10,
                color: "black"
            }
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux durées figurant dans le contrat (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 1,
                x: 187,
                y: 760,
                name: "Date de signature",
                id: "element_12",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 730,
                name: "Loi Pinel (loi n°2014-626 du 18 juin 2014) est elle applicable ? (oui ou non)",
                id: "element_13",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 680,
                name: "La date de prise d'effet",
                id: "element_14",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 650,
                name: "La durée du bail",
                id: "element_15",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 625,
                name: "Le terme contractuel du bail (Date)",
                id: "element_16",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 585,
                name: "Y a t il une période ferme ? (si oui, préciser)",
                id: "element_17",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 560,
                name: "La prochaine faculté de sortie (Date)",
                id: "element_18",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 520,
                name: "Le préavis minimum à respecter (si oui, préciser la durée (exemple 6 mois))",
                id: "element_19",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 480,
                name: "Existe t-il une clause spécifique relative à la durée du Bail renouvelé ? (si oui, préciser)",
                id: "element_20",
                fontSize: 10,
                color: "black"
            }
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux loyers (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 1,
                x: 187,
                y: 385,
                name: "Le mode de calcul des loyers : Fixe ? Paliers (préciser) ? Clause recette (par exemple : Loyer variable pur, Loyer binaire avec un loyer minimum garanti (seuil de déclenchement) ou Loyer 'double composante' : une part fixe et une part additionnelle variable.)",
                id: "element_21",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 320,
                name: "Le loyer annuel (HT HC) initial",
                id: "element_22",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 300,
                y: 320,
                name: "Le loyer annuel (HT HC) en cours (en précisant si possible la source : [selon l’état locatif en date du XX / la facture du XX]",
                id: "element_23",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 265,
                name: "Le payement trimestriellement et d'avance (si non, préciser)",
                id: "element_24",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 187,
                y: 215,
                name: "La TVA expressément applicable",
                id: "element_25",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 75,
                y: 145,
                name: "Existe t-il une clause d'indexation ?",
                id: "element_26",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 156,
                y: 95,
                name: "Si il existe un clause d'indexation, quelle est la date d'indexation ?",
                id: "element_27",
                fontSize: 10,
                color: "black"
            },
            {
                page: 1,
                x: 340,
                y: 95,
                name: "Si il existe un clause d'indexation, quelle est la périodicité de l'indexation ?",
                id: "element_28",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 75,
                y: 750,
                name: "Si il existe un clause d'indexation, quel est l'indice INSEE ?",
                id: "element_29",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 70,
                y: 670,
                name: "Si il existe un clause d'indexation, la 1ère indexation de son indice INSEE ?",
                id: "element_30",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 70,
                y: 630,
                name: "Si il existe un clause d'indexation, les indexations suivants la 1ère indexation de son indice INSEE ?",
                id: "element_31",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 70,
                y: 600,
                name: "Si il existe un clause d'indexation, quel est son indice de comparaison ?",
                id: "element_32",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 240,
                y: 750,
                name: "Si il existe un clause d'indexation, y a t-il un indice de base fixe (préciser) ?",
                id: "element_33",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 240,
                y: 725,
                name: "Si il existe un clause d'indexation, y a t-il une indexation à la hausse uniquement (préciser) ?",
                id: "element_34",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 240,
                y: 700,
                name: "Si il existe un clause d'indexation, y a t-il un plafond / plancher (préciser) ?",
                id: "element_35",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 240,
                y: 675,
                name: "Si il existe un clause d'indexation, y a t-il un risque de distorsion (pour une autre raison) (préciser) ?",
                id: "element_36",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 240,
                y: 645,
                name: "Si il existe un clause d'indexation, y a t-il une divisibilité de la clause d'indexation (pour une autre raison) (préciser) ?",
                id: "element_37",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 190,
                y: 580,
                name: "Y a t-il une augmentation de 25% par comparaison avec le dernier loyer (contractuel, renouvelé ou révisé) - article L. 145-39 du Code de commerce ? (si oui préciser)",
                id: "element_38",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 190,
                y: 470,
                name: "Y a t-il une Clause relative au loyer du Bail renouvelé dérogeant à l'article L. 145-34 du Code de commerce ? (si oui préciser)",
                id: "element_39",
                fontSize: 10,
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux mesures d'accompagnement (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 2,
                x: 185,
                y: 350,
                name: "Y a t-il une franchise et/ou réduction de loyer en cours ? ",
                id: "element_40",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 285,
                y: 330,
                name: "Si franchise et/ou réduction de loyer en cours, quel est son montant et son étalement ? ",
                id: "element_41",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 360,
                y: 302,
                name: "Une side letter TVA est-elle fournie en Data Room ? ",
                id: "element_42",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 185,
                y: 275,
                name: "Y a t-il une participation financière du Bailleur aux travaux d'aménagement du Preneur ? (oui ou non)",
                id: "element_43",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 230,
                y: 250,
                name: "Si il y a une participation financière du Bailleur aux travaux d'aménagement du Preneur, quel est son montant ?",
                id: "element_44",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 300,
                y: 225,
                name: "Si il y a une participation financière du Bailleur aux travaux d'aménagement du Preneur, quelles sont ses modalités de facturation ?",
                id: "element_45",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 390,
                y: 200,
                name: "Si il y a une participation financière du Bailleur aux travaux d'aménagement du Preneur, un justificatif de payement est il fourni en Data Room ?",
                id: "element_46",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 360,
                y: 175,
                name: "Si il y a une participation financière du Bailleur aux travaux d'aménagement du Preneur, une side letter TVA est elle fournie en Data Room ?",
                id: "element_47",
                fontSize: 10,
                color: "black"
            },
            {
                page: 2,
                x: 185,
                y: 120,
                name: "Existe t-il d'autres mesures d'accompagnement ? (Si oui préciser)",
                id: "element_48",
                fontSize: 10,
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux garanties (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 3,
                x: 187,
                y: 760,
                name: "Existe t-il un dépot de garantie ?",
                id: "element_49",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 187,
                y: 710,
                name: "Si il existe un dépot de garantie, quel est son montant initial ?",
                id: "element_50",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 290,
                y: 710,
                name: "Si il existe un dépot de garantie, quel est son montant en cours ? (en précisant si possible la source : [selon l’état locatif en date du XX / la facture du XX] ",
                id: "element_51",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 70,
                y: 630,
                name: "Existe t-il d'autres garanties ?",
                id: "element_52",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 70,
                y: 600,
                name: "L'original de la garantie est-il en possession du Bailleur ?",
                id: "element_53",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 70,
                y: 560,
                name: "Si l'original de la garantie est en possession du Bailleur, quelle est sa nature ? cautionnement solidaire, garantie autonome à première demande ou autre (à préciser) ?",
                id: "element_54",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 70,
                y: 480,
                name: "Si l'original de la garantie est en possession du Bailleur, quel est la nature du garant ? société (nom et RCS), banque (nom et RCS) ?",
                id: "element_55",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 290,
                y: 560,
                name: "Si l'original de la garantie est en possession du Bailleur, quel en est le montant ?",
                id: "element_56",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 290,
                y: 540,
                name: "Si l'original de la garantie est en possession du Bailleur, quelle en est l'expiration ?",
                id: "element_57",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 290,
                y: 510,
                name: "Si l'original de la garantie est en possession du Bailleur, cette garantie est-elle transférable au nouveau bailleur ? (Si oui, préciser les modalités de transférabilité en repectant le formalisme (notification / information du preneur))",
                id: "element_58",
                fontSize: 10,
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux honoraires, impots, taxes et assurance du bailleur (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 3,
                x: 190,
                y: 330,
                name: "Pour les parties privatives, y a t-il un impot futur pour le bailleur ?",
                id: "element_59",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 190,
                y: 300,
                name: "Pour les parties privatives, y a t-il un impot futur pour le preneur ?",
                id: "element_60",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 190,
                y: 270,
                name: "Pour les parties privatives, si l'impot futur n'est pas précisé, retourner 'non précisé' ",
                id: "element_61",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 295,
                y: 330,
                name: "Pour les parties privatives, y a t-il une taxe foncière pour le bailleur ?",
                id: "element_62",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 295,
                y: 300,
                name: "Pour les parties privatives, y a t-il une taxe foncière pour le preneur ?",
                id: "element_63",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 295,
                y: 270,
                name: "Pour les parties privatives, si la taxe foncière n'est pas précisé, retourner 'non précisé' ",
                id: "element_64",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 370,
                y: 330,
                name: "Pour les parties privatives, y a t-il une taxe d'enlèvement des ordures ménagères pour le bailleur ?",
                id: "element_65",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 370,
                y: 300,
                name: "Pour les parties privatives, y a t-il une taxe d'enlèvement des ordures ménagères pour le preneur ?",
                id: "element_66",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 370,
                y: 270,
                name: "Pour les parties privatives, si la taxe d'enlèvement des ordures ménagères n'est pas précisé, retourner 'non précisé' ",
                id: "element_67",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 460,
                y: 330,
                name: "Pour les parties privatives, y a t-il une taxe sur les locaux à usage de bureaux / de commerce pour le bailleur ?",
                id: "element_68",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 460,
                y: 300,
                name: "Pour les parties privatives, y a t-il une taxe sur les locaux à usage de bureaux / de commerce pour le preneur ?",
                id: "element_69",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 460,
                y: 270,
                name: "Pour les parties privatives, si la taxe sur les locaux à usage de bureaux / de commerce n'est pas précisé, retourner 'non précisé' ",
                id: "element_70",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 190,
                y: 230,
                name: "Pour les parties communes, y a t-il un impot futur pour le bailleur ?",
                id: "element_71",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 190,
                y: 200,
                name: "Pour les parties communes, y a t-il un impot futur pour le preneur ?",
                id: "element_72",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 190,
                y: 165,
                name: "Pour les parties communes, si l'impot futur n'est pas précisé, retourner 'non précisé' ",
                id: "element_73",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 295,
                y: 230,
                name: "Pour les parties communes, y a t-il une taxe foncière pour le bailleur ?",
                id: "element_74",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 295,
                y: 200,
                name: "Pour les parties communes, y a t-il une taxe foncière pour le preneur ?",
                id: "element_75",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 295,
                y: 165,
                name: "Pour les parties communes, si la taxe foncière n'est pas précisé, retourner 'non précisé' ",
                id: "element_76",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 370,
                y: 230,
                name: "Pour les parties communes, y a t-il une taxe d'enlèvement des ordures ménagères pour le bailleur ?",
                id: "element_77",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 370,
                y: 200,
                name: "Pour les parties communes, y a t-il une taxe d'enlèvement des ordures ménagères pour le preneur ?",
                id: "element_78",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 370,
                y: 165,
                name: "Pour les parties communes, si la taxe d'enlèvement des ordures ménagères n'est pas précisé, retourner 'non précisé' ",
                id: "element_79",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 460,
                y: 230,
                name: "Pour les parties communes, y a t-il une taxe sur les locaux à usage de bureaux / de commerce pour le bailleur ?",
                id: "element_80",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 460,
                y: 200,
                name: "Pour les parties communes, y a t-il une taxe sur les locaux à usage de bureaux / de commerce pour le preneur ?",
                id: "element_81",
                fontSize: 10,
                color: "black"
            },
            {
                page: 3,
                x: 460,
                y: 165,
                name: "Pour les parties communes, si la taxe sur les locaux à usage de bureaux / de commerce n'est pas précisé, retourner 'non précisé' ",
                id: "element_82",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 680,
                name: "Concernant les honoraires, y en a t-il sur la gestion technique pour le bailleur ?",
                id: "element_83",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 625,
                name: "Concernant les honoraires, y en a t-il sur la gestion technique pour le preneur ?",
                id: "element_84",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 570,
                name: "Concernant les honoraires, si non précisé pour la gestion technique, retourner 'non précisé' ",
                id: "element_85",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 680,
                name: "Concernant les honoraires, y en a t-il sur la gestion locative (hors gestion des loyers) pour le bailleur ?",
                id: "element_86",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 625,
                name: "Concernant les honoraires, y en a t-il sur la gestion locative (hors gestion des loyers) pour le preneur ?",
                id: "element_87",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 570,
                name: "Concernant les honoraires, si non précisé pour la gestion locative hors gestion des loyers, retourner 'non précisé' ",
                id: "element_88",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 680,
                name: "Concernant les honoraires, y en a t-il sur la gestion des loyers pour le bailleur ?",
                id: "element_89",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 625,
                name: "Concernant les honoraires, y en a t-il sur la gestion des loyers pour le preneur ?",
                id: "element_90",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 570,
                name: "Concernant les honoraires, si non précisé pour la gestion des loyers, retourner 'non précisé' ",
                id: "element_91",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 680,
                name: "Concernant les honoraires, y en a t-il sur la gestion du syndic de copropriété / ASL / AFUL / autres organisations collectives pour le bailleur ?",
                id: "element_92",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 625,
                name: "Concernant les honoraires, y en a t-il sur la gestion du syndic de copropriété / ASL / AFUL / autres organisations collectives pour le preneur ?",
                id: "element_93",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 570,
                name: "Concernant les honoraires, si non précisé sur la gestion du syndic de copropriété / ASL / AFUL / autres organisations collectives, retourner 'non précisé' ",
                id: "element_94",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 530,
                name: "Les assurances du Bailleur figurent elles dans le document ? (oui ou non)",
                id: "element_95",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 530,
                name: "Les assurances du Preneur figurent elles dans le document ? (oui ou non)",
                id: "element_96",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 530,
                name: "Si aucune précision sur le fait que ces assurances soient liées au Bailleur ou au Preneur, retourner non précisé ?",
                id: "element_97",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 490,
                name: "Des informations relatives au Fonds marketing sont elles présentes ? (oui ou non)",
                id: "element_98",
                fontSize: 10,
                color: "red"
            },
            {
                page: 4,
                x: 190,
                y: 460,
                name: "Si des informations relatives au Fonds marketing sont présentes, préciser le montant refacturable au Preneur dans le Bail.",
                id: "element_99",
                fontSize: 10,
                color: "red"
            },
            {
                page: 4,
                x: 190,
                y: 405,
                name: "Si des informations relatives au Fonds marketing sont présentes, préciser si l'indexation est présente ou non et donner l'indice.",
                id: "element_100",
                fontSize: 10,
                color: "red"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux travaux, réparations, remplacements et déstructions (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 4,
                x: 190,
                y: 270,
                name: "Pour les parties privatives, est-il mention de grosses réparations (art. 606 du Code civil) pour le bailleur ?",
                id: "element_101",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 240,
                name: "Pour les parties privatives, est-il mention de grosses réparations (art. 606 du Code civil) pour le preneur ?",
                id: "element_102",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 205,
                name: "Pour les parties privatives, si aucune mention de grosses réparations (art. 606 du Code civil) ne figure, retourner 'non précisé' ?",
                id: "element_103",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 270,
                name: "Pour les parties privatives, est-il mention de mise en conformité et injonction administrative pour le bailleur ?",
                id: "element_104",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 240,
                name: "Pour les parties privatives, est-il mention de mise en conformité et injonction administrative pour le preneur ?",
                id: "element_105",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 205,
                name: "Pour les parties privatives, si aucune mention de mise en conformité et injonction administrative ne figure, retourner 'non précisé' ?",
                id: "element_106",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 270,
                name: "Pour les parties privatives, est-il mention de prise en charge de la vetusté et force majeur (article 1755 du Code civil) pour le bailleur ?",
                id: "element_107",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 240,
                name: "Pour les parties privatives, est-il mention de prise en charge de la vetusté et force majeur (article 1755 du Code civil) pour le preneur ?",
                id: "element_108",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 205,
                name: "Pour les parties privatives, si aucune mention de prise en charge de la vetusté et force majeur (article 1755 du Code civil) ne figure, retourner 'non précisé' ?",
                id: "element_109",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 270,
                name: "Pour les parties privatives, est-il mention de remplacement des éléments d'équipements pour le bailleur ?",
                id: "element_110",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 240,
                name: "Pour les parties privatives, est-il mention de remplacement des éléments d'équipements pour le preneur ?",
                id: "element_111",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 205,
                name: "Pour les parties privatives, si aucune mention de remplacement des éléments d'équipements ne figure, retourner 'non précisé' ?",
                id: "element_112",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 170,
                name: "Pour les parties communes, est-il mention de grosses réparations (art. 606 du Code civil) pour le bailleur ?",
                id: "element_113",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 140,
                name: "Pour les parties communes, est-il mention de grosses réparations (art. 606 du Code civil) pour le preneur ?",
                id: "element_114",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 190,
                y: 110,
                name: "Pour les parties communes, si aucune mention de grosses réparations (art. 606 du Code civil) ne figure, retourner 'non précisé' ?",
                id: "element_115",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 170,
                name: "Pour les parties communes, est-il mention de mise en conformité et injonction administrative pour le bailleur ?",
                id: "element_116",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 140,
                name: "Pour les parties communes, est-il mention de mise en conformité et injonction administrative pour le preneur ?",
                id: "element_117",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 295,
                y: 110,
                name: "Pour les parties communes, si aucune mention de mise en conformité et injonction administrative ne figure, retourner 'non précisé' ?",
                id: "element_118",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 170,
                name: "Pour les parties communes, est-il mention de prise en charge de la vetusté et force majeur (article 1755 du Code civil) pour le bailleur ?",
                id: "element_119",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 140,
                name: "Pour les parties communes, est-il mention de prise en charge de la vetusté et force majeur (article 1755 du Code civil) pour le preneur ?",
                id: "element_120",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 370,
                y: 110,
                name: "Pour les parties communes, si aucune mention de prise en charge de la vetusté et force majeur (article 1755 du Code civil) ne figure, retourner 'non précisé' ?",
                id: "element_121",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 170,
                name: "Pour les parties communes, est-il mention de remplacement des éléments d'équipements pour le bailleur ?",
                id: "element_122",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 140,
                name: "Pour les parties communes, est-il mention de remplacement des éléments d'équipements pour le preneur ?",
                id: "element_123",
                fontSize: 10,
                color: "black"
            },
            {
                page: 4,
                x: 460,
                y: 110,
                name: "Pour les parties communes, si aucune mention de remplacement des éléments d'équipements ne figure, retourner 'non précisé' ?",
                id: "element_124",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 190,
                y: 720,
                name: "Concernant les travaux, y a t-il mention de dérogation à l'article 1722 du Code civil (Article 1722 du Code civil : 'Si, pendant la durée du bail, la chose louée est détruite en totalité par cas fortuit, le bail est résilié de plein droit ; si elle n'est détruite qu'en partie, le preneur peut, suivant les circonstances, demander ou une diminution du prix, ou la résiliation même du bail. Dans l'un et l'autre cas, il n'y a lieu à aucun dédommagement') ? Si oui, préciser." ,
                id: "element_125",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 190,
                y: 570,
                name: "Concernant les travaux du Bailleur, est-il mention de la faculté de modifier les Locaux Loués / l’Immeuble (dérogation à l'article 1723 du Code civil : 'Le bailleur ne peut, pendant la durée du bail, changer la forme de la chose louée'.) ? Si oui, préciser",
                id: "element_126",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 375,
                y: 570,
                name: "Concernant les travaux du Bailleur, est-il mention de la Faculté de réaliser des travaux dans les Locaux Loués / l’Immeuble durant plus de 21/40 jours sans indemnité (dérogation à l'article 1724 du Code civil : Si, durant le bail, la chose louée a besoin de réparations urgentes et qui ne puissent être différées jusqu'à sa fin, le preneur doit les souffrir, quelque incommodité qu'elles lui causent, et quoiqu'il soit privé, pendant qu'elles se font, d'une partie de la chose louée. Mais, si ces réparations durent plus de quarante jours, le prix du bail sera diminué à proportion du temps et de la partie de la chose louée dont il aura été privé. Si les réparations sont de telle nature qu'elles rendent inhabitable ce qui est nécessaire au logement du preneur et de sa famille, celui-ci pourra faire résilier le bail) ? Si oui, préciser",
                id: "element_127",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 190,
                y: 480,
                name: "Concernant les travaux du Preneur, est-il mention de la faculté pour le Preneur de réaliser des travaux sans l'accord préalable du Bailleur ? Si oui, préciser.",
                id: "element_128",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 375,
                y: 480,
                name: "Concernant les travaux du Preneur, est-il mention de la faculté pour le Preneur d’apposer des plaques et/ou enseignes autorisée sans l'accord préalable du Bailleur ? Si oui, préciser.",
                id: "element_129",
                fontSize: 10,
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives à la restitution des locaux loués, à la sous-location, la location-gérance, la domiciliation et la cessionm en droit de préemption et droit de préférence (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 5,
                x: 190,
                y: 390,
                name: "Quel est l'état de restitution des Locaux Loués? (à choisir parmi Neuf, Parfait, Bon ou Etat d'usage). ",
                id: "element_130",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 190,
                y: 340,
                name: "Existe t-il une clause d'accession ?",
                id: "element_131",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 190,
                y: 310,
                name: "Si il existe une clause d'accession est il précisé sans indemnité ? (à choisir parmi en fin de bail, en fin de jouissance ou autre à préciser). ",
                id: "element_132",
                fontSize: 10,
                color: "black"
            },
            {
                page: 5,
                x: 190,
                y: 290,
                name: "Est-il mention de la faculté au choix du Bailleur de demander la remise en état initial des Locaux Loués ? (oui ou non)",
                id: "element_133",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 760,
                name: "Existe t-il une indemnité d'immobilisation / occupation ? (si oui, préciser, sinon non)",
                id: "element_134",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 700,
                name: "Un état des lieux est il fourni en Data room ? (oui ou non)",
                id: "element_135",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 550,
                name: "Existe t-il une faculté de sous-location sans l'accord préalable du Bailleur ? Oui, Non",
                id: "element_200",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 255,
                y: 550,
                name: "Existe t-il une faculté de location-gérance sans l'accord préalable du Bailleur ? Oui, Non",
                id: "element_201",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 330,
                y: 550,
                name: "Existe t-il une faculté de domiciliation sans l'accord préalable du Bailleur ? Oui, Non",
                id: "element_202",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 410,
                y: 550,
                name: "Existe t-il une faculté de cession du droit au bail seul sans l'accord préalable du Bailleur ? Oui, Non",
                id: "element_203",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 495,
                y: 550,
                name: "Existe t-il une faculté de cession du fonds de commerce sans l'accord préalable du Bailleur ? Oui, Non",
                id: "element_204",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 490,
                name: "Les locaux sont ils indivisibles ? Si non précisé dans le document, ajouter 'non précisé'.",
                id: "element_205",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 440,
                name: "Concernant les garanties en cas de cession, des données sont elles données par le cédant ? (oui, non)",
                id: "element_136",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 400,
                name: "Si des garanties en cas de cession sont données par le cédant, quelle entitée garantie ? 1er cessionnaire uniquement, Cessionnaires successifs.",
                id: "element_137",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 350,
                y: 400,
                name: "Si des garanties en cas de cession sont données par le cédant, une durée limitée à 3 ans stipulée ? Si non, préciser.",
                id: "element_138",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 335,
                name: "Concernant les garanties en cas de cession, des données sont elles données par le cessionnaire (en sus des garanties prévues au Bail) ? Si oui, préciser.",
                id: "element_139",
                fontSize: 10,
                color: "black"
            },
            {
                page: 6,
                x: 190,
                y: 190,
                name: "Y a t-il des droits de préemption / droits de préférence en cas de location par le Bailleur de locaux lui appartenant ? Si oui, préciser. Si non précisé dans le document, ajouter 'non précisé'.",
                id: "element_140",
                fontSize: 10,
                color: "black"
            },
            {
                page: 7,
                x: 190,
                y: 680,
                name: "Y a t-il des droits de préemption / droits de préférence en cas de cession par le Bailleur (aménagement ou dérogation à l'article L. 145-46-1 du Code de commerce) de Locaux Loués ? Si oui, préciser. Si non précisé dans le document, ajouter 'non précisé'.",
                id: "element_141",
                fontSize: 10,
                color: "black"
            },
            {
                page: 7,
                x: 350,
                y: 680,
                name: "Y a t-il des droits de préemption / droits de préférence en cas de cession par le Bailleur (aménagement ou dérogation à l'article L. 145-46-1 du Code de commerce) de l'Immeuble ? Si oui, préciser. Si non précisé dans le document, ajouter 'non précisé'.",
                id: "element_142",
                fontSize: 10,
                color: "black"
            },
            {
                page: 7,
                x: 515,
                y: 680,
                name: "Y a t-il des droits de préemption / droits de préférence en cas de cession par le Preneur concernant le Fonds de commerce ? Si oui, préciser. Si non précisé dans le document, ajouter 'non précisé'.",
                id: "element_143",
                fontSize: 10,
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de dossier de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives à l'environnement (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 7,
                x: 190,
                y: 500,
                name: "Un diagnostic technique amiante ('DTA') ou fiche récapitulative du DTA7 est il présent (Pour tout immeuble bâti dont le permis de construire a été délivré avant le 1er juillet 1997, le bailleur doit mettre à disposition des occupants d’un actif immobilier le dossier technique amiante portant sur cet actif, lors de la conclusion ou du renouvellement des baux commerciaux. La validité du DTA est illimitée en l’absence de matériaux ou produits contenant de l’amiante.)? Oui, Non, Non applicable.",
                id: "element_144",
                fontSize: 10,
                color: "black"
            },
            {
                page: 7,
                x: 310,
                y: 500,
                name: "Un diagnostic d'état des risques (ER) est il présent (Etat des risques naturels (miniers) et technologiques (ERNT/ERNMT) à transmettre au locataire à compter du 14 juillet 2010, devenu Etat des Servitudes Risques et d’Informations sur les Sols (ESRIS) à compter du 1er janvier 2018, puis Etat des Risques et Pollutions (ERP) le 3 août 2018 et finalement Etat des Risques (ER) à compter du 1er janvier 2023.)? Si Oui est il inférieur à 6 mois (Avant le 1er janvier 2023 : 6 mois à la date de signature du bail ; Depuis le 1er janvier 2023 : 6 mois à la date de la première visite et actualisé au jour de la signature du bail) ? Paraphé/signé ? , Non, Non applicable.",
                id: "element_145",
                fontSize: 10,
                color: "black"
            },
            {
                page: 7,
                x: 430,
                y: 500,
                name: "Un diagnostic de performance énergétique (DPE) est il présent ?",
                id: "element_146",
                fontSize: 10,
                color: "black"
            },
            {
                page: 7,
                x: 500,
                y: 500,
                name: "Une annexe environnementale est elle présente (Annexe environnementale pour les locaux de plus de 2.000 m² à usage de bureaux ou de commerces, à annexer (i) aux baux conclus ou renouvelés depuis le 1er janvier 2012 et (ii) aux baux en cours à compter du 14 juillet 2013.) ?",
                id: "element_147",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 7,
                x: 190,
                y: 350,
                name: "Un décret tertiaire applicable est il présent (applicable à tout bâtiment (ou ensemble sur une même unité foncière) existant au 24 novembre 2018 et hébergeant exclusivement des activités tertiaires sur une surface de plancher supérieure ou égale à 1.000 m², sauf exception de l’article R. 131-38 du Code de la construction et de l’habitation.) ?",
                id: "element_148",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 7,
                x: 190,
                y: 300,
                name: "Si un décret tertiaire applicable est présent, la dernière attestation numérique annuelle OPERAT est elle annexée au Bail ? Oui , Non (Tolérance admise jusqu'au 31 décembre 2022 au plus tard pour les premières déclarations), Non applicable(La première attestation devra être obtenue au plus tard le 30 septembre 2021)",
                id: "element_149",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 720,
                name: "Si un décret tertiaire applicable est présent, qui est la ou les personne(s) ayant la charge de la déclaration des consommations annuelles sur OPERAT ? Bailleur uniquement (préciser), Preneur et Bailleur (préciser), non précisé.",
                id: "element_150",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 620,
                name: "Si un décret tertiaire applicable est présent, des stipulations expresses concernant le plan d’actions sont elles présentes ? Si oui, préciser",
                id: "element_151",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 560,
                name: "Concernant les installations classées pour la protection de l'environnement ('ICPE') dans les Locaux Loués, quel est le statut des titre(s) ICPE (enregistrement,déclaration et autorisation) : existant (préciser), obtenir (préciser), non précisé ? ",
                id: "element_152",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 490,
                name: "Concernant les installations classées pour la protection de l'environnement ('ICPE') dans les Locaux Loués, quel est le statut des stipulations expresses concernant les obligations ICPE : existant (préciser), obtenir (préciser), non précisé ? ",
                id: "element_153",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 410,
                name: "Concernant la pollution, des activitées polluantes sont elles mentionnées ? Oui, Non, non précisé",
                id: "element_154",
                fontSize: 10, 
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 380,
                name: "Concernant la pollution, des Stipulations expresses concernant la dépollution sont elles mentionnées ? Oui, Non, non précisé",
                id: "element_155",
                fontSize: 10, 
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de dossier de bail immobilier, vous devez lire attentivement le document suivant pour identifier et extraire les informations suivantes relatives aux stipulations Intuitu Personae / Renonciations (si certaines informations sont absentes ou incomplètes, précisez-le également) : ", 
        labels: [
            {
                page: 8,
                x: 190,
                y: 280,
                name: "Y a t-il des Stipulations intuitu personae ? Si oui, préciser.",
                id: "element_156",
                fontSize: 10,
                color: "black"
            },
            {
                page: 8,
                x: 190,
                y: 250,
                name: "Y a t-il des Renonciation à l’imprévision (dérogation à l’article 1195 du Code civil : 'Si un changement de circonstances imprévisible lors de la conclusion du contrat rend l exécution excessivement onéreuse pour une partie qui n avait pas accepté d en assumer le risque, celle-ci peut demander une renégociation du contrat à son cocontractant. Elle continue à exécuter ses obligations durant la renégociation. En cas de refus ou d'échec de la renégociation, les parties peuvent convenir de la résolution du contrat, à la date et aux conditions qu'elles déterminent, ou demander d'un commun accord au juge de procéder à son adaptation. A défaut d'accord dans un délai raisonnable, le juge peut, à la demande d une partie, réviser le contrat ou y mettre fin, à la date et aux conditions qu il fixe'.) ? Si oui, préciser.",
                id: "element_157",
                fontSize: 10,
                color: "black"
            },
            {
                page: 9,
                x: 190,
                y: 760,
                name: "Concernant les relations avec le Preneur, y a t-il des impayés ? Si oui, préciser. Sinon, mentionner 'non préciser'.",
                id: "element_158",
                fontSize: 10,
                color: "black"
            },
            {
                page: 9,
                x: 190,
                y: 730,
                name: "Concernant les relations avec le Preneur, y a t-il des échanges significatifs ? Si oui, préciser. Sinon, mentionner 'non préciser'.",
                id: "element_159",
                fontSize: 10,
                color: "black"
            },
            {
                page: 9,
                x: 190,
                y: 700,
                name: "Concernant les relations avec le Preneur, y a t-il des différends / précontentieux ? Si oui, préciser. Sinon, mentionner 'non préciser'.",
                id: "element_160",
                fontSize: 10,
                color: "black"
            },
        ]
    },
    {
        prompt: "Specialiste dans l'analyse de dossier de bail immobilier, vous devez lire attentivement le dossier suivant et établir des commentaires sur les principaux points d'attention et risques que vous relevez lors de votre étude. : ", 
        labels: [
            {
                page: 9,
                x: 190,
                y: 620,
                name: "Insérer les points d'attention et risques identifiés lors de l'étude du dossier",
                id: "element_161",
                fontSize: 10,
                color: "black"
            },
            {
                page: 9,
                x: 120,
                y: 500,
                name: "Insérer les passages liés à ces points d'attention et risques et le cas échéant, indiquer en 'note' les problèmes relatifs aux documents - Pages manquantes / doublon / contenu du document ne correspondant pas à l’intitulé (illisible, etc.)",
                id: "element_162",
                fontSize: 10,
                color: "black"
            },
        ]
    }

]


export interface Case {
    column: string;
    index: number;
    name: string;
    page: number;
}

export interface ExcelCase {
    prompt: string;
    cases: Case[];
}

export const excelCase: ExcelCase[] = [
    {
        prompt: "Specialiste dans la détection des parties engagées dans un document de type bail immobilier, vous devez analyser un bail immobilier pour identifier et extraire les informations suivantes (si certaines informations sont absentes ou incomplètes, précisez-le également). : ",
        cases: [
            {
                column: "B",
                index: 2,
                name: "Le nom du Bailleur",
                page: 0
            },
            {
                column: "C",
                index: 2,
                name: "Le nom du Preneur",
                page: 0
            },
            {
                column: "D",
                index: 2,
                name: "Le type de bail",
                page: 0
            },
            {
                column: "E",
                index: 2,
                name: "La destination du bail",
                page: 0
            },
            {
                column: "F",
                index: 2,
                name: "La désignation du bail", //x
                page: 0
            },
            {
                column: "G",
                index: 2,
                name: "Le/les activité(s) autorisée(s)", //x
                page: 0
            },
            //DURÉE
            {
                column: "H",
                index: 2,
                name: "La date de signature du bail",
                page: 0
            },
            {
                column: "I",
                index: 2,
                name: "La date de prise d'effet du bail",
                page: 0
            },
            {
                column: "J",
                index: 2,
                name: "La date d'expiration d'effet du bail",
                page: 0
            },
            {
                column: "K",
                index: 2,
                name: "La durée du bail",
                page: 0
            },
            {
                column: "L",
                index: 2,
                name: "Prochaine faculté de sortie du preneur du bail",
                page: 0
            },
            //LOYER ET GARANTIES
            {
                column: "M",
                index: 2,
                name: "Loyer annuel initial (tel que modifié par avenant le cas échéant) (€ HT HC) du bail",
                page: 0
            },
            {
                column: "N",
                index: 2,
                name: "Loyer variable du bail",
                page: 0
            },
            {
                column: "O",
                index: 2,
                name: "Paiement trimestriel et d'avance du bail",
                page: 0
            },
            {
                column: "P",
                index: 2,
                name: "Mesures d'accompagnement du bail",
                page: 0
            },
            {
                column: "Q",
                index: 2,
                name: "Soumission du loyer à la TVA du bail",
                page: 0
            },
            {
                column: "R",
                index: 2,
                name: "Une Garanties locatives du bail",
                page: 0
            },
            {
                column: "S",
                index: 2,
                name: "Garanties locatives fournies en DR du bail",
                page: 0
            },
            {
                column: "T",
                index: 2,
                name: "Périodicité de l'indexation du bail",
                page: 0
            },
            {
                column: "U",
                index: 2,
                name: "Indice du bail",
                page: 0
            },
            {
                column: "V",
                index: 2,
                name: "Variation de plus de 25 % depuis la dernière fixation du loyer (contractuelle, judiciaire ou par renouvellement) contraire à l'article L.145-39 du code de commerce (conformément à l'état locatif du 30 novembre 2017)",
                page: 0
            },
            {
                column: "W",
                index: 2,
                name: "Clause d'indexation contraire à l'article L. 112-1 du CMF (indice de base fixe / à la hausse / plafond ou plancher)",
                page: 0
            },
            {
                column: "X",
                index: 2,
                name: "Ici, indique-moi un commentaire à partir des informations du bail, par exemple si le bail suit les normes ou pas.",
                page: 0
            },
        ],
    },
    //PAGE Refacturation des charges
    {
        prompt: "Specialiste dans la détection de refacturation des charges dans un document de type bail immobilier, vous devez analyser un bail immobilier pour identifier et extraire les informations suivantes (si certaines informations sont absentes ou incomplètes, précisez-le également). ",
        cases: [
            //INFORMATION GÉNÉRALE
            {
                column: "B",
                index: 2,
                name: "Le nom du Bailleur", //x
                page: 1,
            },
            {
                column: "C",
                index: 2,
                name: "Le nom du Preneur", //x
                page: 1,
            },
            //REPARTITION DES CHARGES
            {
                column: "D",
                index: 2,
                name: "Taxe foncière Locaux loué", //x
                page: 1,
            },
            {
                column: "E",
                index: 2,
                name: "Taxe foncière Parties communes ", //x
                page: 1,
            },
            {
                column: "F",
                index: 2,
                name: "Taxe d’Enlèvement des Ordures Ménagères des Locaux loués",
                page: 1,
            },
            {
                column: "G",
                index: 2,
                name: "Taxe d’Enlèvement des Ordures Ménagères des Parties communes",
                page: 1,
            },
            {
                column: "H",
                index: 2,
                name: "Taxes sur les bureaux et locaux commerciaux en Île-de-France Locaux loués",
                page: 1,
            },
            {
                column: "I",
                index: 2,
                name: "Taxes sur les bureaux et locaux commerciaux en Île-de-France Parties communes",
                page: 1,
            },
            {
                column: "J",
                index: 2,
                name: "Impôts futurs Locaux loués",
                page: 1,
            },
            {
                column: "K",
                index: 2,
                name: "Impôts futurs Parties communes",
                page: 1,
            },
            {
                column: "L",
                index: 2,
                name: "Honoraires de gestion locative (prise en charge et limite le cas échéant)",
                page: 1,
            },
            {
                column: "M",
                index: 2,
                name: "Honoraires de gestion des loyers (prise en charge et limite le cas échéant)",
                page: 1,
            },
            {
                column: "N",
                index: 2,
                name: "Honoraires de gestion technique (prise en charge et limite le cas échéant)",
                page: 1,
            },
            {
                column: "O",
                index: 2,
                name: "Honoraires de gestion du syndic de copropriété (prise en charge et limite le cas échéant)",
                page: 1,
            },
            {
                column: "P",
                index: 2,
                name: "Assurances du bailleur",
                page: 1,
            },
            {
                column: "Q",
                index: 2,
                name: "Clauses spécifiques (franchise, plafond, forfait de charges)",
                page: 1,
            },
            //PRISE EN CHARGE DES TRAVAUX
            {
                column: "R",
                index: 2,
                name: "Travaux relevant de l'article 606 du Code civil Locaux loués",
                page: 1,
            },
            {
                column: "S",
                index: 2,
                name: "Travaux relevant de l'article 606 du Code civil Parties communes",
                page: 1,
            },
            {
                column: "T",
                index: 2,
                name: "Travaux de mise en conformité requis par l'administration Locaux loués",
                page: 1,
            },
            {
                column: "U",
                index: 2,
                name: "Travaux de mise en conformité requis par l'administration Locaux loués",
                page: 1,
            },
            {
                column: "V",
                index: 2,
                name: "Travaux liés à la vétusté Locaux loués",
                page: 1,
            },
            {
                column: "W",
                index: 2,
                name: "Travaux liés à la vétusté Parties communes",
                page: 1,
            },
            {
                column: "X",
                index: 2,
                name: "Travaux de remplacement des équipements dans les Locaux loués",
                page: 1,
            },
            {
                column: "Y",
                index: 2,
                name: "Travaux de remplacement des équipements dans les Parties communes",
                page: 1,
            },
        ]
    },
    // Page Divers
    {
        prompt: "Specialiste dans la détection de tache divers comme la sous-location les cessions, et les facteurs environnementaux dans un document de type bail immobilier, vous devez analyser un bail immobilier pour identifier et extraire les informations suivantes (si certaines informations sont absentes ou incomplètes, précisez-le également). ",
        cases: [
            {
                column: "B",
                index: 2,
                name: "Le nom du Bailleur", //x
                page: 2,
            },
            {
                column: "C",
                index: 2,
                name: "Le nom du Preneur", //x
                page: 2,
            },
            //SOUS-LOCATION / CESSION
            {
                column: "D",
                index: 2,
                name: "Sous-location autorisée (Oui précisez ou Non)", //x
                page: 2,
            },
            {
                column: "E",
                index: 2,
                name: "Cession du droit au bail seul + garanties", //x
                page: 2,
            },
            {
                column: "F",
                index: 2,
                name: "Cession du fonds de commerce + garanties", //x
                page: 2,
            },
            //RESTITUTION DES LOCAUX
            {
                column: "G",
                index: 2,
                name: "Etat de restitution des locaux loués", //x
                page: 2,
            },
            {
                column: "H",
                index: 2,
                name: "Clause d'accession sans indemnité / avec indemnité (propriété des travaux du Preneur en fin de bail)", //x
                page: 2,
            },
            {
                column: "I",
                index: 2,
                name: "Faculté pour le Bailleur de demander la remise en état initial au départ du Preneur en fin de bail", //x
                page: 2,
            },
            {
                column: "J",
                index: 2,
                name: "Etat des lieux fourni en Document Référentiel", //x
                page: 2,
            },
            //DIVERS
            {
                column: "K",
                index: 2,
                name: "Droit contractuel de préemption  / préférence au bénéfice du Preneur en cas de vente des locaux loués", //x
                page: 2,
            },
            {
                column: "L",
                index: 2,
                name: "Clause de non concurrence pesant sur le Bailleur", //x
                page: 2,
            },
            //ENVIRONNEMENT
            {
                column: "M",
                index: 2,
                name: "Diagnostic technique amiante annexé au bail / mis à la disposition du preneur", //x
                page: 2,
            },
            {
                column: "N",
                index: 2,
                name: "Diagnostic de performance énergétique annexé au bail", //x
                page: 2,
            },
            {
                column: "O",
                index: 2,
                name: "Présence d'Installation Classée pour la Protection de l’Environnemen", //x
                page: 2,
            },
            {
                column: "P",
                index: 2,
                name: "État des Risques Naturels, Miniers et Technologiques annexé au bail (signé et daté de moins de 6 mois à la signature)", //x
                page: 2,
            },
            {
                column: "Q",
                index: 2,
                name: "CLAUSE RESOLUTOIRE", //x
                page: 2,
            },
            {
                column: "X",
                index: 2,
                name: "Ici, indique-moi un commentaire à partir des extrait du bail.",
                page: 0
            },
        ]
    }, 
    //CLAUSE RESOLUTOIRE
];
  
export const metaPrompt = "\n" +
                    "FORMAT DE RÉPONSE REQUIS :\n" +
                    `[format]` +
                    "\n" +
                    "RÈGLES D'EXTRACTION :\n" +
                    "- Si l'information est absente : utiliser null\n" +
                    "- Pour les dates : format JJ/MM/AAAA\n" +
                    "- Pour les adresses : inclure numéro, rue, code postal, ville\n" +
                    "- Pour les noms : inclure la forme juridique si présente\n" +
                    "\n" +
                    "INSTRUCTIONS SUPPLÉMENTAIRES :\n" +
                    "- Ne fournir que le JSON en réponse\n" +
                    "- Aucun texte explicatif\n" +
                    "- Conserver la structure exacte des clés\n" +
                    "- Ne m'envoie jamais de tableau de strings, joins les strings avec un saut de ligne\n" +
                    "- Toujours respecter le format 'clé : valeur extraite'.\n" +
                    "- Assurer la validité du JSON."