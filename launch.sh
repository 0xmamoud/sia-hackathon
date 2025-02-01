#!/bin/bash

FRONTEND_PATH="frontend"
BACKEND_PATH="backend"
PYTHON_SERVICE_PATH="backend/src/service/python"
VENV_PATH="$PYTHON_SERVICE_PATH/venv"

if ! command -v bun &> /dev/null; then
    echo "Erreur : Bun n'est pas installé. Installe-le avec 'curl -fsSL https://bun.sh/install | bash'"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "Erreur : Python3 n'est pas installé."
    exit 1
fi

python_version=$(python3 --version 2>&1 | awk '{print $2}')
required_version="3.10.12"

if [[ $(echo -e "$python_version\n$required_version" | sort -V | head -n1) != "$required_version" ]]; then
    echo "La version de Python est trop récente ou trop ancienne. Installation de Python 3.10.12 via pyenv..."
    if ! command -v pyenv &> /dev/null; then
        echo "Erreur : pyenv n'est pas installé. Installe-le avec 'curl https://pyenv.run | bash'"
        exit 1
    fi
    pyenv install 3.10.12
    pyenv local 3.10.12
    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init --path)"
    eval "$(pyenv init -)"
    python_version=$(python3 --version)
    echo "Nouvelle version de Python : $python_version"
fi

echo "Installation des dépendances..."
(cd "$FRONTEND_PATH" && bun install) &
(cd "$BACKEND_PATH" && bun install) &
wait

# Génération du client Prisma et synchronisation de la base de données
echo "Génération du client Prisma et synchronisation de la base de données..."
(cd "$BACKEND_PATH" && bunx prisma generate && bunx prisma db pull)

echo "Configuration du service Python..."
if [ ! -d "$VENV_PATH" ]; then
    python3 -m venv "$VENV_PATH"
fi
source "$VENV_PATH/bin/activate"
pip install --upgrade pip
pip install -r "$PYTHON_SERVICE_PATH/requirements.txt"

echo "Démarrage du frontend..."
(cd "$FRONTEND_PATH" && bun dev) &
FRONTEND_PID=$!

sleep 2

echo "Démarrage du backend..."
(cd "$BACKEND_PATH" && bun run src/main.ts) &
BACKEND_PID=$!

sleep 2

echo "Démarrage du service Python avec Uvicorn..."
(source "$VENV_PATH/bin/activate" && cd $PYTHON_SERVICE_PATH && python -m uvicorn pdfToMd_service:app --host 0.0.0.0 --port 8005) &
PYTHON_PID=$!

cleanup() {
    echo "Arrêt des processus..."
    kill $FRONTEND_PID $BACKEND_PID $PYTHON_PID 2>/dev/null
    wait $FRONTEND_PID $BACKEND_PID $PYTHON_PID
    echo "Tous les processus sont arrêtés."
    exit 0
}

trap cleanup SIGINT SIGTERM

wait $FRONTEND_PID $BACKEND_PID $PYTHON_PID