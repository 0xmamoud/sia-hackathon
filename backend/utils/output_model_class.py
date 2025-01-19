from pydantic import BaseModel
from typing import Optional, List, Dict, Any

# Captures details from the claim document
class InformationsStandard(BaseModel):
    Adresse_du_bien: Optional[str]
    Nom_du_locataire: Optional[str]
    Nom_du_bailleur: Optional[str]
    Date_de_début: Optional[str]
    Date_de_fin: Optional[str]
    Durée: Optional[str]
    Loyer_mensuel : Optional[float]
    Charges_mensuelles : Optional[float]
    Garantie: Optional[float]
    Restrictions_d_usage: Optional[float]
    Modalités_de_renouvellement: Optional[float]
    Conditions_de_résiliation: Optional[float]