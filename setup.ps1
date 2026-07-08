$ErrorActionPreference = "Stop"

New-Item -Path "perfiles" -ItemType Directory -Force | Out-Null
New-Item -Path "perfiles/plantilla_cv" -ItemType Directory -Force | Out-Null

if (Test-Path "index.html") { Move-Item -Path "index.html" -Destination "perfiles/plantilla_cv/index.html" -Force }
if (Test-Path "data.js") { Move-Item -Path "data.js" -Destination "perfiles/plantilla_cv/data.js" -Force }

$profiles = @(
    @{ id="carlos-ruiz"; name="Carlos Ruiz"; role="Ingeniero en Informática"; tags=@("ingeniería", "informática", "desarrollo", "backend", "software"); summary="Especialista en desarrollo backend y arquitecturas escalables." },
    @{ id="ana-silva"; name="Ana Silva"; role="Diseñadora UX/UI"; tags=@("diseño", "ux", "ui", "interfaces", "figma"); summary="Diseñadora centrada en el usuario con 5 años de experiencia." },
    @{ id="luis-torres"; name="Luis Torres"; role="Arquitecto Cloud"; tags=@("cloud", "aws", "gcp", "devops", "infraestructura"); summary="Experto en migraciones a la nube y automatización." },
    @{ id="maria-gomez"; name="María Gómez"; role="Científica de Datos"; tags=@("datos", "data science", "machine learning", "python", "ai"); summary="Analista predictiva y experta en IA generativa." },
    @{ id="juan-perez"; name="Juan Pérez"; role="Gerente de Proyectos"; tags=@("gerencia", "proyectos", "scrum", "agile", "pmp"); summary="Líder ágil orientado a la entrega de valor y equipos de alto rendimiento." }
)

$db = @()

foreach ($p in $profiles) {
    $dir = "perfiles/" + $p.id
    New-Item -Path $dir -ItemType Directory -Force | Out-Null
    Copy-Item -Path "perfiles/plantilla_cv/index.html" -Destination "$dir/index.html" -Force
    
    $dataJs = @"
const portfolioData = {
    personal: { name: "$($p.name)", role: "$($p.role)", email: "contacto@ejemplo.com", phone: "+123", location: "Remoto", linkedin: "#", summary: "$($p.summary)" },
    experience: [], education: [], skills: ["$($p.tags[0])", "$($p.tags[1])"]
};
"@
    Set-Content -Path "$dir/data.js" -Value $dataJs -Encoding utf8
    
    $db += @{
        id = $p.id
        name = $p.name
        role = $p.role
        tags = $p.tags
        url = "/perfiles/$($p.id)/"
    }
}

$db | ConvertTo-Json -Depth 5 | Set-Content -Path "database.json" -Encoding utf8
Write-Output "Setup complete"
