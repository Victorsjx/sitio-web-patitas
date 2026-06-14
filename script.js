// =========================================================================
// 1. BASE DE DATOS LOCAL
// =========================================================================
let reportesRealTime = [
    // URGENTES
    { id:1,  titulo:"Gatito atrapado en árbol", estado:"Urgente", comuna:"Providencia", descripcion:"Gato joven no puede bajar desde hace 24 horas. Esquina Condell con Marín, frente a la plaza.", coords:[-33.4442,-70.6285], fecha:"Hace 10 min", ts: Date.now()-10*60*1000 },
    { id:2,  titulo:"Perrita atropellada Alameda", estado:"Urgente", comuna:"Santiago Centro", descripcion:"Perrita mediana atropellada frente al Metro Baquedano. Está consciente pero no puede moverse. Necesita traslado urgente.", coords:[-33.4380,-70.6350], fecha:"Hace 3 min", ts: Date.now()-3*60*1000 },
    { id:3,  titulo:"Cachorro en zanja Las Rejas", estado:"Urgente", comuna:"Pudahuel", descripcion:"Cachorro de aprox. 2 meses caído en zanja de agua en pasaje Las Rejas Norte. Está temblando y maullando.", coords:[-33.4490,-70.7420], fecha:"Hace 8 min", ts: Date.now()-8*60*1000 },
    { id:4,  titulo:"Perrita abandonada paradero", estado:"Urgente", comuna:"La Florida", descripcion:"Perrita recién abandonada con dos cachorros en caja de cartón junto a estación Vicuña Mackenna.", coords:[-33.5190,-70.5980], fecha:"Hace 5 min", ts: Date.now()-5*60*1000 },
    { id:5,  titulo:"Gato con herida en pata", estado:"Urgente", comuna:"Macul", descripcion:"Gato atigrado con herida profunda en pata trasera izquierda. Está bajo un auto en Av. Macul con Quilín.", coords:[-33.4870,-70.5850], fecha:"Hace 15 min", ts: Date.now()-15*60*1000 },
    { id:6,  titulo:"Perro atrapado en reja", estado:"Urgente", comuna:"San Miguel", descripcion:"Perro mediano atrapado por el cuello en reja de condominio. Lleva más de 2 horas. Calle Departamental.", coords:[-33.4970,-70.6530], fecha:"Hace 20 min", ts: Date.now()-20*60*1000 },

    // EN ATENCIÓN
    { id:7,  titulo:"Quiltro comunitario herido", estado:"Atención", comuna:"Santiago Centro", descripcion:"Perrito cojea de pata delantera. Los vecinos le dan comida pero necesita revisión médica. Cerca del Mercado Central.", coords:[-33.4510,-70.6550], fecha:"Hace 1 hora", ts: Date.now()-60*60*1000 },
    { id:8,  titulo:"Gata con camada en sitio eriazo", estado:"Atención", comuna:"Recoleta", descripcion:"Gata con 4 gatitos recién nacidos viviendo en sitio eriazo. Ya tiene voluntaria que le lleva comida pero buscan hogar de tránsito.", coords:[-33.4140,-70.6440], fecha:"Hace 2 horas", ts: Date.now()-2*60*60*1000 },
    { id:9,  titulo:"Perro senior en la calle", estado:"Atención", comuna:"Las Condes", descripcion:"Perro de raza grande, viejo y desdentado, deambula por Av. Apoquindo. Tiene collar pero sin chapa. Parece perdido.", coords:[-33.4170,-70.5950], fecha:"Hace 3 horas", ts: Date.now()-3*60*60*1000 },
    { id:10, titulo:"Colonia de gatos sin esterilizar", estado:"Atención", comuna:"Ñuñoa", descripcion:"Colonia de 9 gatos en plaza Ñuñoa. Voluntaria los alimenta pero urge campaña de esterilización. Buscan apoyo veterinario.", coords:[-33.4580,-70.5980], fecha:"Hace 4 horas", ts: Date.now()-4*60*60*1000 },
    { id:11, titulo:"Cocker abandonado con sarna", estado:"Atención", comuna:"Estación Central", descripcion:"Cocker spaniel con sarna moderada encontrado en Av. Ecuador. Ya está en hogar de tránsito, busca financiamiento para tratamiento.", coords:[-33.4560,-70.6820], fecha:"Hace 5 horas", ts: Date.now()-5*60*60*1000 },
    { id:12, titulo:"Pitbull encadenado sin agua", estado:"Atención", comuna:"La Pintana", descripcion:"Perro encadenado en sitio baldío sin agua ni sombra. Vecinos reportan que su dueño no aparece hace días. Se está coordinando con Carabineros.", coords:[-33.5780,-70.6280], fecha:"Ayer", ts: Date.now()-25*60*60*1000 },

    // EN ADOPCIÓN
    { id:13, titulo:"Luna busca familia", estado:"adopcion", comuna:"Ñuñoa", descripcion:"Perrita mestiza de 7 meses, esterilizada, vacunas al día, muy dócil y juguetona. Ideal para departamento con niños.", coords:[-33.4620,-70.6050], fecha:"Ayer", ts: Date.now()-24*60*60*1000 },
    { id:14, titulo:"Simón — labrador 3 años", estado:"adopcion", comuna:"Providencia", descripcion:"Labrador amarillo castrado, 3 años, sociable con personas y otros perros. Sabe comandos básicos. Busca familia con jardín.", coords:[-33.4310,-70.6140], fecha:"Hace 2 días", ts: Date.now()-48*60*60*1000 },
    { id:15, titulo:"Familia de gatitos — 8 semanas", estado:"adopcion", comuna:"Las Condes", descripcion:"Tres gatitos (2 grises y 1 naranja) de 8 semanas en búsqueda de hogar. Desparasitados. Se adoptan juntos o por separado.", coords:[-33.4080,-70.5720], fecha:"Hace 2 días", ts: Date.now()-50*60*60*1000 },
    { id:16, titulo:"Coco — mestizo adulto manso", estado:"adopcion", comuna:"Maipú", descripcion:"Perro mestizo de 5 años, castrado, tranquilo y cariñoso. Muy bueno con adultos mayores. Lleva 8 meses en hogar de tránsito.", coords:[-33.5120,-70.7680], fecha:"Hace 3 días", ts: Date.now()-72*60*60*1000 },
    { id:17, titulo:"Mishi — gata adulta esterilizada", estado:"adopcion", comuna:"Santiago Centro", descripcion:"Gata blanca con manchas negras, 4 años, esterilizada y muy independiente. Ideal para personas que trabajan todo el día.", coords:[-33.4490,-70.6620], fecha:"Hace 3 días", ts: Date.now()-74*60*60*1000 },
    { id:18, titulo:"Canela — podenco rescatada", estado:"adopcion", comuna:"San Bernardo", descripcion:"Perra podenco de 2 años rescatada de criadero ilegal. Ya superó su miedo inicial. Busca familia paciente y cariñosa.", coords:[-33.5990,-70.7050], fecha:"Hace 4 días", ts: Date.now()-96*60*60*1000 },
    { id:19, titulo:"Thor — husky joven activo", estado:"adopcion", comuna:"Vitacura", descripcion:"Husky siberiano de 1 año y medio, sin castrar aún. Mucha energía, necesita espacio y ejercicio diario. Entrega con cartilla veterinaria.", coords:[-33.3860,-70.5830], fecha:"Hace 4 días", ts: Date.now()-98*60*60*1000 },
    { id:20, titulo:"Dos conejitos mini lop", estado:"adopcion", comuna:"La Florida", descripcion:"Pareja de conejos mini lop (macho y hembra), 6 meses. Se entregan con jaula y accesorios. Esterilización pendiente.", coords:[-33.5240,-70.5870], fecha:"Hace 5 días", ts: Date.now()-120*60*60*1000 },
];

const lugaresApoyo = [
    // ── REFUGIOS ──────────────────────────────────────────────────────────
    {
        tipo:"refugio",
        nombre:"Refugio Patitas con Amor",
        descripcion:"Refugio sin fines de lucro fundado en 2012. Alberga más de 120 perros y gatos. Realizan ferias de adopción cada primer domingo del mes en Parque Bustamante. Aceptan voluntarios y donaciones de alimento.",
        direccion:"Av. Departamental 3450, San Miguel",
        horario:"Sáb y Dom 10:00 – 17:00",
        contacto:"+56 9 8765 4321",
        lat:-33.5012, lng:-70.6678
    },
    {
        tipo:"refugio",
        nombre:"Santuario Huella Animal",
        descripcion:"Especializado en rescate y rehabilitación de animales víctimas de maltrato. Proceso de adopción responsable con visita previa al hogar y seguimiento de 3 meses. ONG certificada por SAG.",
        direccion:"Los Aromos 890, La Pintana",
        horario:"Lun a Vie 09:00 – 18:00 / Sáb 10:00 – 14:00",
        contacto:"+56 9 7234 8901",
        lat:-33.5780, lng:-70.6350
    },
    {
        tipo:"refugio",
        nombre:"Red de Hogares de Tránsito Peluditos",
        descripcion:"Red de más de 60 familias de tránsito en Santiago. Reciben perros y gatos rescatados mientras se gestionan adopciones definitivas. Siempre necesitan nuevos hogares temporales.",
        direccion:"Coordinación en Pudahuel — contactar por WhatsApp",
        horario:"Atención WhatsApp: todos los días 09:00 – 21:00",
        contacto:"+56 9 6123 7890",
        lat:-33.4450, lng:-70.7580
    },
    {
        tipo:"refugio",
        nombre:"Refugio El Arcoíris",
        descripcion:"Atienden perros y gatos de todas las edades, incluidos adultos mayores y animales con necesidades especiales. Realizan jornadas de esterilización gratuita el último sábado de cada mes.",
        direccion:"Elías Ramírez 2200, Maipú",
        horario:"Mar, Jue y Sáb 10:00 – 17:00",
        contacto:"+56 9 9871 2345",
        lat:-33.5150, lng:-70.7650
    },
    {
        tipo:"refugio",
        nombre:"Fundación Callejeros con Suerte",
        descripcion:"Rescatan animales desde la calle y los preparan para adopción. Tienen programa de apadrinamiento económico para quienes no pueden adoptar. Publican actualizaciones diarias en redes sociales.",
        direccion:"Av. Grecia 750, Ñuñoa",
        horario:"Lun a Sáb 10:00 – 19:00",
        contacto:"+56 9 8234 5670",
        lat:-33.4610, lng:-70.5870
    },
    {
        tipo:"refugio",
        nombre:"Hogar Amigos del Parque",
        descripcion:"Refugio comunitario gestionado por vecinos de La Reina. Tienen convenio con la municipalidad para esterilización gratuita de animales rescatados. Feria de adopción cada 15 días en el Parque Mahuida.",
        direccion:"Av. Ossa 9900, La Reina",
        horario:"Sáb y Dom 10:00 – 16:00",
        contacto:"+56 9 7890 1234",
        lat:-33.4520, lng:-70.5490
    },

    // ── VETERINARIAS ──────────────────────────────────────────────────────
    {
        tipo:"veterinaria",
        nombre:"VetClass — Clínica Veterinaria 24 Hrs",
        descripcion:"Una de las clínicas más grandes de Santiago. Urgencias las 24 horas, hospitalización, cirugía, oncología y especialidades. Tienen convenio con Patitas al Rescate: descuento del 20% en consultas para animales rescatados presentando el reporte.",
        direccion:"Av. Providencia 1652, Providencia",
        horario:"24 horas, todos los días del año",
        contacto:"+56 2 2236 6000",
        lat:-33.4288, lng:-70.6150
    },
    {
        tipo:"veterinaria",
        nombre:"Clínica Veterinaria Universidad de Chile",
        descripcion:"Hospital clínico docente con todas las especialidades. Precios accesibles por ser universitario. Atiende derivaciones complejas y casos de urgencia. Programa de esterilización subsidiada para animales de rescate.",
        direccion:"Av. Santa Rosa 11735, La Pintana",
        horario:"Lun a Vie 08:00 – 20:00 / Sáb 09:00 – 13:00",
        contacto:"+56 2 2978 5600",
        lat:-33.5690, lng:-70.6360
    },
    {
        tipo:"veterinaria",
        nombre:"Clínica Veterinaria Popular Maipú",
        descripcion:"Atención de calidad a precios populares. Vacunas desde $3.500, microchip desde $5.000, esterilización con financiamiento en cuotas. Muy recomendada por rescatistas independientes de la zona poniente.",
        direccion:"Av. 5 de Abril 1980, Maipú",
        horario:"Lun a Sáb 09:00 – 20:00 / Dom 10:00 – 14:00",
        contacto:"+56 2 2534 7890",
        lat:-33.5200, lng:-70.7580
    },
    {
        tipo:"veterinaria",
        nombre:"Centro Veterinario Ñuñoa",
        descripcion:"Especialistas en medicina interna, dermatología y cirugía de tejidos blandos. Programa gratuito de esterilización para animales en adopción con certificado de refugio o rescatista. Atienden urgencias hasta las 22:00.",
        direccion:"Av. Irarrázaval 4510, Ñuñoa",
        horario:"Lun a Vie 08:30 – 22:00 / Sáb 09:00 – 17:00",
        contacto:"+56 2 2274 5678",
        lat:-33.4590, lng:-70.5980
    },
    {
        tipo:"veterinaria",
        nombre:"Clínica Veterinaria La Florida",
        descripcion:"Urgencias, cirugía ortopédica y odontología veterinaria. Colaboran activamente con rescatistas independientes con tarifas preferenciales acreditadas. Tienen sala de recuperación para animales post-rescate.",
        direccion:"Av. Vicuña Mackenna 8900, La Florida",
        horario:"Lun a Dom 08:00 – 22:00",
        contacto:"+56 2 2283 1234",
        lat:-33.5150, lng:-70.5980
    },
    {
        tipo:"veterinaria",
        nombre:"Veterinaria Recoleta Municipal",
        descripcion:"Servicio municipal de atención veterinaria a muy bajo costo para residentes de Recoleta. Vacunas, desparasitación, microchip y esterilización subsidiada. No requiere derivación, solo cédula de identidad.",
        direccion:"Av. Recoleta 2774, Recoleta",
        horario:"Lun a Vie 09:00 – 17:00",
        contacto:"+56 2 2430 3100",
        lat:-33.4050, lng:-70.6430
    },
    {
        tipo:"veterinaria",
        nombre:"Hospital Veterinario San Bernardo",
        descripcion:"Urgencias 24/7 con médico residente permanente. Única clínica de urgencias en el sector sur de Santiago. Convenio con municipalidad de San Bernardo para atención de animales rescatados sin costo de consulta.",
        direccion:"Freire 1200, San Bernardo",
        horario:"24 horas, todos los días",
        contacto:"+56 2 2812 3456",
        lat:-33.5920, lng:-70.6990
    },
];

// =========================================================================
// 2. ESTADO GLOBAL DE FILTROS
// =========================================================================
let marcadoresActuales = [];
let marcadoresLugares  = [];
let chatIniciado       = false;
let vistaActual        = 'reportes';

let filtroEstado   = 'todos';
let filtroTipo     = 'reportes';
let filtroSort     = 'reciente';
let filtroBusqueda = '';
let firebaseApp    = null;
let auth           = null;
let db             = null;
let usuarioActual  = null;
let firebaseActivo = false;

console.log("[Patitas al Rescate] v2 — animaciones + filtros avanzados cargados.");

// =========================================================================
// 2.1 FIREBASE: AUTH + FIRESTORE
// =========================================================================
function tieneConfigFirebaseReal() {
    return !!(
        window.firebase &&
        window.firebaseConfig &&
        window.firebaseConfig.apiKey &&
        !window.firebaseConfig.apiKey.includes("PEGA_AQUI") &&
        window.firebaseConfig.projectId &&
        !window.firebaseConfig.projectId.includes("TU_PROYECTO")
    );
}

function inicializarFirebasePatitas() {
    if (!tieneConfigFirebaseReal()) {
        console.warn("[Firebase] Agrega tus datos reales en firebase-config.js para activar Auth y Firestore.");
        return;
    }

    try {
        firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        firebaseActivo = true;

        auth.onAuthStateChanged((user) => {
    usuarioActual = user;
    console.log("[Auth] Usuario:", user ? user.email : "no logueado");
    actualizarBotonSesion();
});

        escucharReportesFirestore();
        console.log("[Firebase] Conectado correctamente.");
    } catch (error) {
        console.error("[Firebase] No se pudo inicializar:", error);
        mostrarToast("Firebase no pudo iniciar. Revisa firebase-config.js.");
    }
}

function actualizarBotonSesion() {
    const btn = document.querySelector(".btn-login");
    if (!btn) return;
    if (usuarioActual) {
        const nombre = usuarioActual.displayName || usuarioActual.email.split("@")[0];
        btn.innerText = "👋 Hola, " + nombre;
    } else {
        btn.innerText = "Iniciar sesión";
    }
}

function normalizarReporteFirestore(doc) {
    const data = doc.data();
    const createdAt = data.createdAt && data.createdAt.toMillis ? data.createdAt.toMillis() : Date.now();

    return {
        id: doc.id,
        titulo: data.titulo || "Reporte sin titulo",
        estado: data.estado || "Atencion",
        comuna: data.comuna || "Sin comuna",
        descripcion: data.descripcion || "",
        coords: Array.isArray(data.coords) ? data.coords : [-33.4560, -70.6300],
        fecha: formatearFechaRelativa(createdAt),
        ts: createdAt,
        uid: data.uid || null
    };
}

function formatearFechaRelativa(timestamp) {
    const diff = Date.now() - timestamp;
    const minutos = Math.max(0, Math.floor(diff / 60000));
    if (minutos < 1) return "Ahora mismo";
    if (minutos < 60) return `Hace ${minutos} min`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `Hace ${horas} hora${horas === 1 ? "" : "s"}`;
    const dias = Math.floor(horas / 24);
    return `Hace ${dias} dia${dias === 1 ? "" : "s"}`;
}

function escucharReportesFirestore() {
    if (!firebaseActivo || !db) return;

    db.collection("reportes")
        .orderBy("createdAt", "desc")
        .limit(80)
        .onSnapshot((snapshot) => {
            const reportesNube = snapshot.docs.map(normalizarReporteFirestore);
            if (reportesNube.length > 0) {
                reportesRealTime = reportesNube;
                if (vistaActual === "reportes") renderizarPlataforma();
            }
        }, (error) => {
            console.error("[Firestore] Error leyendo reportes:", error);
            mostrarToast("No pude cargar reportes de Firestore. Usando datos de ejemplo.");
        });
}

async function crearReporteFirestore(reporte) {
    if (!firebaseActivo || !db || !usuarioActual) return false;

    await db.collection("reportes").add({
        uid: usuarioActual.uid,
        titulo: reporte.titulo,
        estado: reporte.estado,
        comuna: reporte.comuna,
        descripcion: reporte.descripcion,
        coords: reporte.coords,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return true;
}

// =========================================================================
// 3. MAPA
// =========================================================================
const mapa = L.map('mapa-interactivo').setView([-33.4560,-70.6300], 11.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'© OpenStreetMap contributors' }).addTo(mapa);

function obtenerIconoPorEstado(estado) {
    const colores = { "Urgente":"#dc2626", "Atención":"#c07a2e", "adopcion":"#3d7a4f" };
    const color   = colores[estado] || "#3d7a4f";
    const cls     = estado === "Urgente" ? "pin-urgente" : estado === "Atención" ? "pin-atencion" : "";
    return L.divIcon({
        className: 'custom-pin',
        html: `<div class="${cls}" style="background:${color};width:15px;height:15px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);"></div>`,
        iconSize:[15,15], iconAnchor:[7,7]
    });
}

function crearIconoLugar(tipo) {
    const esr  = tipo === 'refugio';
    const bg   = esr ? '#7c3aed' : '#0369a1';
    const brd  = esr ? '#a78bfa' : '#7dd3fc';
    const icn  = esr ? '🏠' : '🏥';
    return L.divIcon({
        className:'',
        html:`<div style="background:${bg};width:36px;height:36px;border-radius:50% 50% 50% 4px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 3px 12px ${bg}88;border:2px solid ${brd};transform:rotate(-45deg);"><span style="transform:rotate(45deg);display:block;">${icn}</span></div>`,
        iconSize:[36,36], iconAnchor:[18,36], popupAnchor:[0,-38]
    });
}

const leyenda = L.control({ position:'bottomleft' });
leyenda.onAdd = () => {
    const div = L.DomUtil.create('div');
    div.innerHTML = `<div style="background:rgba(255,255,255,0.95);border:1.5px solid #d9d0c0;border-radius:12px;padding:10px 14px;font-size:12px;color:#5c5646;font-family:'Nunito','Segoe UI',sans-serif;line-height:1.9;box-shadow:0 2px 10px rgba(61,50,30,0.12);">
        <div style="font-weight:800;color:#2d2a22;margin-bottom:5px;">Referencias</div>
        <div>🔴 Urgente</div><div>🟡 En atención</div><div>🟢 En adopción</div>
        <div><span style="color:#7c3aed;">🏠</span> Refugio</div>
        <div><span style="color:#0369a1;">🏥</span> Veterinaria</div>
    </div>`;
    return div;
};
leyenda.addTo(mapa);

// =========================================================================
// 4. SKELETON LOADING
// =========================================================================
function mostrarSkeleton() {
    const c = document.getElementById("rescates-container");
    if (!c) return;
    c.innerHTML = [1,2,3].map(() => `
        <div class="skeleton-item">
            <div class="skeleton-line full"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line short"></div>
        </div>`).join('');
}

// =========================================================================
// 5. RENDERIZADO DE REPORTES
// =========================================================================
function renderizarPlataforma(filtro) {
    if (filtro !== undefined) filtroEstado = filtro;
    mostrarSkeleton();
    setTimeout(() => _renderizar(), 420);
}

function _renderizar() {
    marcadoresActuales.forEach(m => mapa.removeLayer(m));
    marcadoresActuales = [];

    const contenedor = document.getElementById("rescates-container");
    const contadorEl = document.getElementById("contador-rescates");

    // Filtrar
    let lista = reportesRealTime.filter(r => {
        if (filtroEstado !== 'todos' && r.estado !== filtroEstado) return false;
        if (filtroBusqueda) {
            const q = filtroBusqueda.toLowerCase();
            if (!r.titulo.toLowerCase().includes(q) &&
                !r.comuna.toLowerCase().includes(q) &&
                !r.descripcion.toLowerCase().includes(q)) return false;
        }
        return true;
    });

    // Ordenar
    if (filtroSort === 'urgente') {
        const orden = { "Urgente":0, "Atención":1, "adopcion":2 };
        lista.sort((a,b) => (orden[a.estado]??3) - (orden[b.estado]??3));
    } else {
        lista.sort((a,b) => b.ts - a.ts);
    }

    actualizarResultadosBar(lista.length);
    if (contadorEl) contadorEl.innerText = lista.length;

    if (lista.length === 0) {
        if (contenedor) contenedor.innerHTML = `<div class="feed-vacio"><p>🛰️ Sin resultados para tu búsqueda.</p></div>`;
        return;
    }

    let htmlFeed = '';
    lista.forEach(r => {
        const marker = L.marker(r.coords, { icon: obtenerIconoPorEstado(r.estado) })
            .addTo(mapa)
            .bindPopup(`<b style="color:#2d2a22;font-size:14px;font-family:'Nunito','Segoe UI',sans-serif;">${r.titulo}</b><br>
                <span style="color:#8c8070;font-size:11px;">📍 ${r.comuna}</span><br>
                <p style="margin-top:6px;font-size:12px;color:#5c5646;line-height:1.5;">${r.descripcion}</p>`);
        marcadoresActuales.push(marker);

        let tagClass = "green-t", textoEstado = "🟢 Adopción";
        if (r.estado === "Urgente")  { tagClass = "red-t";    textoEstado = "🔴 Urgente"; }
        if (r.estado === "Atención") { tagClass = "orange-t"; textoEstado = "🟡 Atención"; }

        const esAdopcion = r.estado === "adopcion";
        htmlFeed += `
            <div class="item-feed${esAdopcion ? ' adopcion-card' : ''}" onclick="enfocarMarcador(${r.coords[0]},${r.coords[1]})">
                <div class="item-feed-header">
                    <h4>${r.titulo}</h4>
                    <span class="tag-feat ${tagClass}">${textoEstado}</span>
                </div>
                <p>${r.descripcion}</p>
                <div class="item-feed-meta">
                    <span>📍 ${r.comuna}</span>
                    <span>${r.fecha}</span>
                </div>
               ${esAdopcion ? `<div class="adopcion-cta" onclick="event.stopPropagation();mostrarToast('🤍 Abriendo ficha de adopción de ${r.titulo}...')">🤍 Quiero adoptarle</div>` : ''}
                ${(() => { const u = usuarioActual || firebase.auth().currentUser; return u && r.uid === u.uid ? `<button class="btn-eliminar-reporte" onclick="event.stopPropagation();eliminarReporte('${r.id}')">🗑️ Eliminar</button>` : ''; })()}
            </div>`;
    });

    if (contenedor) contenedor.innerHTML = htmlFeed;
}

// =========================================================================
// 6. REFUGIOS Y VETERINARIAS
// =========================================================================
function mostrarLugares(tipo) {
    marcadoresLugares.forEach(m => mapa.removeLayer(m));
    marcadoresLugares = [];
    mostrarSkeleton();

    setTimeout(() => {
        const esR   = tipo === 'refugio';
        const color = esR ? '#7c3aed' : '#0369a1';
        const label = esR ? 'Refugio' : 'Veterinaria';
        const emoji = esR ? '🏠' : '🏥';

        let lista = lugaresApoyo.filter(l => l.tipo === tipo);
        if (filtroBusqueda) {
            const q = filtroBusqueda.toLowerCase();
            lista = lista.filter(l =>
                l.nombre.toLowerCase().includes(q) ||
                l.descripcion.toLowerCase().includes(q) ||
                l.direccion.toLowerCase().includes(q)
            );
        }

        actualizarResultadosBar(lista.length);
        const tituloFeed = document.getElementById("feed-titulo");
        const contenedor = document.getElementById("rescates-container");
        if (tituloFeed) tituloFeed.textContent = `${emoji} ${label}es (${lista.length})`;

        lista.forEach((lugar, i) => {
            const marker = L.marker([lugar.lat, lugar.lng], { icon: crearIconoLugar(tipo) })
                .addTo(mapa)
                .bindPopup(`<div style="font-family:'Nunito','Segoe UI',sans-serif;min-width:220px;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                        <span style="font-size:20px;">${emoji}</span>
                        <div><strong style="font-size:14px;color:#2d2a22;">${lugar.nombre}</strong><br>
                        <span style="font-size:11px;background:${color}18;color:${color};padding:2px 8px;border-radius:100px;font-weight:700;">${label}</span></div>
                    </div>
                    <p style="font-size:12px;color:#5c5646;line-height:1.5;margin-bottom:8px;">${lugar.descripcion}</p>
                    <div style="font-size:11px;color:#8c8070;display:flex;flex-direction:column;gap:4px;">
                        <span>📍 ${lugar.direccion}</span>
                        <span>🕐 ${lugar.horario}</span>
                        <span>📞 <a href="tel:${lugar.contacto}" style="color:${color};text-decoration:none;font-weight:700;">${lugar.contacto}</a></span>
                    </div></div>`, { maxWidth:280 });
            marcadoresLugares.push(marker);
        });

        contenedor.innerHTML = lista.length === 0
            ? `<div class="feed-vacio"><p>🛰️ Sin resultados para tu búsqueda.</p></div>`
            : lista.map((l, i) => `
                <div class="item-feed item-feed-lugar" onclick="centrarLugar(${i},'${tipo}')" style="border-left:3px solid ${color};border-radius:0 10px 10px 0;">
                    <div class="item-feed-header">
                        <h4>${emoji} ${l.nombre}</h4>
                        <span class="tag-feat" style="background:${color}18;color:${color};border:1.5px solid ${color}33;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;">${label}</span>
                    </div>
                    <p>${l.descripcion}</p>
                    <div class="item-feed-meta"><span>📍 ${l.direccion}</span></div>
                    <div class="item-feed-meta" style="margin-top:3px;"><span>🕐 ${l.horario}</span><span>📞 ${l.contacto}</span></div>
                </div>`).join('');
    }, 380);
}

function centrarLugar(index, tipo) {
    const filtrados = lugaresApoyo.filter(l => l.tipo === tipo);
    const lugar = filtrados[index];
    if (!lugar) return;
    mapa.setView([lugar.lat, lugar.lng], 15, { animate:true, duration:0.8 });
    marcadoresLugares.forEach(m => {
        const ll = m.getLatLng();
        if (Math.abs(ll.lat - lugar.lat) < 0.0001 && Math.abs(ll.lng - lugar.lng) < 0.0001) m.openPopup();
    });
}

// =========================================================================
// 7. LÓGICA DE FILTROS AVANZADOS
// =========================================================================
function selChip(el, grupo) {
    const row = document.getElementById('chips-' + grupo);
    row.querySelectorAll('.filter-chip').forEach(c =>
        c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));

    const val = el.dataset.val;
    const clsMap = { 'todos':'on-green','adopcion':'on-green','reportes':'on-green','Urgente':'on-red','Atención':'on-amber','refugio':'on-purple','veterinaria':'on-blue' };
    el.classList.add(clsMap[val] || 'on-green');

    if (grupo === 'estado') {
        filtroEstado = val;
        if (filtroTipo !== 'reportes') {
            filtroTipo = 'reportes';
            document.querySelectorAll('#chips-tipo .filter-chip').forEach(c => c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));
            document.querySelector('#chips-tipo [data-val="reportes"]').classList.add('on-green');
        }
        vistaActual = 'reportes';
        marcadoresLugares.forEach(m => mapa.removeLayer(m));
        marcadoresLugares = [];
        const tituloFeed = document.getElementById("feed-titulo");
        if (tituloFeed) tituloFeed.textContent = `Reportes Activos`;
        renderizarPlataforma();
    } else {
        filtroTipo = val;
        if (val === 'reportes') {
            vistaActual = 'reportes';
            marcadoresLugares.forEach(m => mapa.removeLayer(m));
            marcadoresLugares = [];
            const tituloFeed = document.getElementById("feed-titulo");
            if (tituloFeed) tituloFeed.textContent = `Reportes Activos`;
            renderizarPlataforma();
        } else {
            vistaActual = val;
            marcadoresActuales.forEach(m => mapa.removeLayer(m));
            mostrarLugares(val);
        }
    }
    actualizarBtnLimpiar();
    window.location.hash = "mapa-seccion";
}

function selSort(el) {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
    filtroSort = el.dataset.val;
    if (vistaActual === 'reportes') renderizarPlataforma();
    actualizarBtnLimpiar();
}

function aplicarFiltros() {
    const inp = document.getElementById('filtro-busqueda');
    filtroBusqueda = inp ? inp.value.trim() : '';
    const wrap = document.getElementById('search-wrap');
    if (wrap) wrap.classList.toggle('has-text', filtroBusqueda.length > 0);
    if (vistaActual === 'reportes') renderizarPlataforma();
    else mostrarLugares(vistaActual);
    actualizarBtnLimpiar();
}

function limpiarBusqueda() {
    const inp = document.getElementById('filtro-busqueda');
    if (inp) inp.value = '';
    filtroBusqueda = '';
    const wrap = document.getElementById('search-wrap');
    if (wrap) wrap.classList.remove('has-text');
    aplicarFiltros();
}

function limpiarFiltros() {
    filtroBusqueda = '';
    filtroEstado   = 'todos';
    filtroTipo     = 'reportes';
    filtroSort     = 'reciente';
    vistaActual    = 'reportes';

    const inp = document.getElementById('filtro-busqueda');
    if (inp) inp.value = '';
    const wrap = document.getElementById('search-wrap');
    if (wrap) wrap.classList.remove('has-text');

    document.querySelectorAll('#chips-estado .filter-chip').forEach(c => c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));
    document.querySelector('#chips-estado [data-val="todos"]').classList.add('on-green');
    document.querySelectorAll('#chips-tipo .filter-chip').forEach(c => c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));
    document.querySelector('#chips-tipo [data-val="reportes"]').classList.add('on-green');
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sel'));
    document.querySelector('.sort-btn[data-val="reciente"]').classList.add('sel');

    marcadoresLugares.forEach(m => mapa.removeLayer(m));
    marcadoresLugares = [];
    const tituloFeed = document.getElementById("feed-titulo");
    if (tituloFeed) tituloFeed.textContent = `Reportes Activos`;

    actualizarBtnLimpiar();
    renderizarPlataforma();
    mostrarToast('🔄 Filtros limpiados');
}

function actualizarBtnLimpiar() {
    const btn = document.getElementById('btn-limpiar-todo');
    if (!btn) return;
    const hayFiltros = filtroBusqueda || filtroEstado !== 'todos' || filtroTipo !== 'reportes' || filtroSort !== 'reciente';
    btn.classList.toggle('visible', !!hayFiltros);
}

function actualizarResultadosBar(count) {
    const bar = document.getElementById('resultados-bar');
    const num = document.getElementById('resultados-count');
    if (num) num.textContent = count;
    if (bar) bar.classList.toggle('empty', count === 0);
}

// Mantener sincronía con los botones del navbar antiguo
function filtrarMapa(tipo) {
    filtroEstado = tipo;
    filtroTipo   = 'reportes';
    vistaActual  = 'reportes';
    marcadoresLugares.forEach(m => mapa.removeLayer(m));
    marcadoresLugares = [];

    // Sync chips
    document.querySelectorAll('#chips-estado .filter-chip').forEach(c => c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));
    const chipMap = {'todos':'on-green','adopcion':'on-green','Urgente':'on-red','Atención':'on-amber'};
    const chip = document.querySelector(`#chips-estado [data-val="${tipo}"]`);
    if (chip) chip.classList.add(chipMap[tipo] || 'on-green');

    document.querySelectorAll('#chips-tipo .filter-chip').forEach(c => c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));
    document.querySelector('#chips-tipo [data-val="reportes"]').classList.add('on-green');

    const tituloFeed = document.getElementById("feed-titulo");
    if (tituloFeed) tituloFeed.textContent = `Reportes Activos`;

    actualizarBtnLimpiar();
    renderizarPlataforma();
    window.location.hash = "mapa-seccion";
}

function filtrarLugares(tipo) {
    filtroTipo  = tipo;
    vistaActual = tipo;
    marcadoresActuales.forEach(m => mapa.removeLayer(m));

    document.querySelectorAll('#chips-tipo .filter-chip').forEach(c => c.classList.remove('on-green','on-red','on-amber','on-purple','on-blue'));
    const clsMap = {'refugio':'on-purple','veterinaria':'on-blue'};
    const chip = document.querySelector(`#chips-tipo [data-val="${tipo}"]`);
    if (chip) chip.classList.add(clsMap[tipo]);

    actualizarBtnLimpiar();
    mostrarLugares(tipo);
    window.location.hash = "mapa-seccion";
}

function mostrarTodosLosReportes() { filtrarMapa('todos'); }
function enfocarMarcador(lat, lng) { mapa.setView([lat, lng], 14, { animate:true, duration:1 }); }

inicializarFirebasePatitas();
renderizarPlataforma();

// =========================================================================
// 8. MODALES
// =========================================================================
function abrirModalLogin()   { document.getElementById("modal-login").classList.add("open"); cambiarVistaModal('login'); }
function abrirModalReporte() {
    if (!firebaseActivo) {
        document.getElementById("modal-reporte").classList.add("open");
        return;
    }
    const user = firebase.auth().currentUser;
    if (!user) {
        mostrarToast("🔐 Inicia sesión para reportar un animal.");
        abrirModalLogin();
        return;
    }
    document.getElementById("modal-reporte").classList.add("open");
}
function cerrarModales()     { document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open")); }

function cambiarVistaModal(s) {
    document.getElementById("login-section").style.display    = s === 'login'    ? "block" : "none";
    document.getElementById("registro-section").style.display = s === 'registro' ? "block" : "none";
}

function manejarLogin(e) {
    e.preventDefault();
    mostrarToast("🔐 ¡Sesión iniciada correctamente!");
    cerrarModales();
    document.querySelector(".btn-login").innerText = "👋 Mi Perfil";
}

function manejarRegistro(e) {
    e.preventDefault();
    mostrarToast("🎉 ¡Bienvenido a la comunidad de Patitas al Rescate!");
    cerrarModales();
}

function crearNuevoReporte(e) {
    e.preventDefault();
    const titulo = document.getElementById("rep-titulo").value;
    const estado = document.getElementById("rep-estado").value;
    const comuna = document.getElementById("rep-comuna").value;
    const desc   = document.getElementById("rep-desc").value;
    const lat    = -33.4560 + (Math.random()-0.5)*0.1;
    const lng    = -70.6300 + (Math.random()-0.5)*0.1;

    reportesRealTime.unshift({ id:reportesRealTime.length+1, titulo, estado, comuna, descripcion:desc, coords:[lat,lng], fecha:"Ahora mismo", ts:Date.now() });

    cerrarModales();
    limpiarFiltros();
    mostrarToast("📍 ¡Reporte publicado en el mapa!");
    window.location.hash = "mapa-seccion";
    enfocarMarcador(lat, lng);
}

async function manejarLoginFirebase(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value.trim();
    const password = e.target.querySelector('input[type="password"]').value;

    if (!firebaseActivo || !auth) {
        mostrarToast("Configura Firebase para activar el inicio de sesion real.");
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
        mostrarToast("Sesion iniciada correctamente.");
        cerrarModales();
        actualizarBotonSesion();
    } catch (error) {
        console.error("[Auth] Error iniciando sesion:", error);
        mostrarToast("No pude iniciar sesion. Revisa correo y contrasena.");
    }
}

async function manejarRegistroFirebase(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value.trim();
    const password = e.target.querySelector('input[type="password"]').value;

    if (!firebaseActivo || !auth) {
        mostrarToast("Configura Firebase para activar el registro real.");
        return;
    }

   try {
        const credencial = await auth.createUserWithEmailAndPassword(email, password);
        await credencial.user.updateProfile({ displayName: nombre });
        mostrarToast("Cuenta creada. Bienvenido a Patitas al Rescate.");
        cerrarModales();
    } catch (error) {
        console.error("[Auth] Error registrando usuario:", error);
        mostrarToast("No pude crear la cuenta. Usa una contrasena de al menos 6 caracteres.");
    }
}

async function crearNuevoReporteFirebase(e) {
    e.preventDefault();
    const titulo = document.getElementById("rep-titulo").value.trim();
    const estado = document.getElementById("rep-estado").value;
    const comuna = document.getElementById("rep-comuna").value;
    const desc   = document.getElementById("rep-desc").value.trim();
let lat = -33.4560 + (Math.random()-0.5)*0.1;
let lng = -70.6300 + (Math.random()-0.5)*0.1;

try {
    const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
    );
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
} catch {
    mostrarToast("📍 No se pudo obtener ubicación. Usando coordenadas aproximadas.");
}
    const nuevoReporte = {
        id: reportesRealTime.length + 1,
        titulo,
        estado,
        comuna,
        descripcion: desc,
        coords: [lat, lng],
        fecha: "Ahora mismo",
        ts: Date.now()
    };

    if (firebaseActivo && !usuarioActual) {
        mostrarToast("Inicia sesion para publicar un reporte.");
        abrirModalLogin();
        return;
    }

    try {
        const guardadoEnFirebase = await crearReporteFirestore(nuevoReporte);
        if (!guardadoEnFirebase) {
            reportesRealTime.unshift(nuevoReporte);
        }
    } catch (error) {
        console.error("[Firestore] Error creando reporte:", error);
        mostrarToast("No pude guardar en Firebase. Revisa las reglas de Firestore.");
        return;
    }

    cerrarModales();
    limpiarFiltros();
    mostrarToast(firebaseActivo ? "Reporte publicado en Firestore." : "Reporte publicado en modo de prueba.");
    window.location.hash = "mapa-seccion";
    enfocarMarcador(lat, lng);
    e.target.reset();
}

function irAInicio() { window.scrollTo({ top:0, behavior:'smooth' }); }
function abrirGuiaTenencia() { toggleChat(); const i = document.getElementById("chatbot-input"); if(i){i.value="Háblame de la ley cholito"; enviarMensajeUsuario();} }

// =========================================================================
// 9. TOAST ANIMADO (entrada lateral)
// =========================================================================
function mostrarToast(mensaje) {
    const existing = document.getElementById('toast-patitas');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-patitas';
    toast.innerHTML = mensaje;
    toast.style.cssText = `
        position:fixed;bottom:100px;right:28px;z-index:9999;
        background:#ffffff;border:1.5px solid #3d7a4f;border-left:4px solid #3d7a4f;
        color:#2d2a22;padding:14px 20px;border-radius:14px;
        font-size:14px;font-weight:600;font-family:'Nunito','Segoe UI',sans-serif;
        box-shadow:0 8px 24px rgba(61,50,30,0.15);
        max-width:300px;line-height:1.4;opacity:0;
    `;
    document.body.appendChild(toast);
    toast.classList.add('toast-entering');
    requestAnimationFrame(() => { toast.style.opacity = '1'; });

    setTimeout(() => {
        toast.classList.remove('toast-entering');
        toast.classList.add('toast-exiting');
        setTimeout(() => toast.remove(), 320);
    }, 3500);
}

// =========================================================================
// 10. ANIMACIONES — SCROLL REVEAL + CONTADORES + STAT BARS
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {

    // Iniciar chatbot
    const c = document.getElementById("chatbot-messages");
    if (c) { mostrarSaludoConBotones(); chatIniciado = true; }

    // IntersectionObserver para reveal + contadores + barras
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Reveal genérico
            if (entry.target.classList.contains('reveal-on-scroll')) {
                entry.target.classList.add('visible');
            }

            // Contadores animados
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.dataset.target, 10);
                if (!isNaN(target)) animarContador(entry.target, target);
            }

            // Stat bars
            if (entry.target.id === 'stat-bars') {
                entry.target.querySelectorAll('.stat-bar-fill').forEach((bar, i) => {
                    const pct = parseInt(bar.dataset.pct, 10);
                    setTimeout(() => { bar.style.width = pct + '%'; }, i * 150);
                });
            }

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-on-scroll, .stat-number, #stat-bars').forEach(el => observer.observe(el));
});

function animarContador(el, target) {
    const duration = 1800;
    const start    = Date.now();
    const step = () => {
        const elapsed  = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        const current  = Math.round(ease * target);
        el.textContent = current.toLocaleString('es-CL');
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

// =========================================================================
// 11. CHATBOT IA
// =========================================================================
function toggleChat() {
    const widget = document.getElementById("chatbot-widget");
    widget.classList.toggle("open");
    if (widget.classList.contains("open") && !chatIniciado) {
        mostrarSaludoConBotones();
        chatIniciado = true;
    }
}

function mostrarSaludoConBotones() {
    const contenedor = document.getElementById("chatbot-messages");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    const saludo = document.createElement("div");
    saludo.className = "msg-bot";
    saludo.innerHTML = "¡Hola! 🐾 Soy tu <strong>Asistente Patitas 24/7</strong>.<br><br>Selecciona una opción o escribe tu consulta:";
    contenedor.appendChild(saludo);

    const menu = document.createElement("div");
    menu.style.cssText = "display:flex;flex-direction:column;gap:6px;margin-top:8px;width:100%;max-width:250px;";

    [
        { texto:"🍖 Guía de Alimentación", clave:"alimentacion" },
        { texto:"🩺 Cuidados y Vacunas",   clave:"vacunas" },
        { texto:"📜 Ley Cholito (Chile)",  clave:"ley" },
        { texto:"🏠 Encontrar un Refugio", clave:"refugio" },
        { texto:"🏥 Veterinarias cercanas",clave:"veterinaria" }
    ].forEach(opc => {
        const btn = document.createElement("button");
        btn.innerText = opc.texto;
        btn.style.cssText = "background:#f7f4ef;border:1.5px solid #d9d0c0;color:#3d7a4f;padding:8px 12px;border-radius:10px;text-align:left;font-size:12px;cursor:pointer;font-weight:700;font-family:'Nunito','Segoe UI',sans-serif;transition:all 0.2s;";
        btn.onmouseenter = () => { btn.style.background="#3d7a4f"; btn.style.color="#fff"; btn.style.borderColor="#3d7a4f"; };
        btn.onmouseleave = () => { btn.style.background="#f7f4ef"; btn.style.color="#3d7a4f"; btn.style.borderColor="#d9d0c0"; };
        btn.onclick = () => seleccionarOpcionGuiada(opc.clave);
        menu.appendChild(btn);
    });
    contenedor.appendChild(menu);
    contenedor.scrollTop = contenedor.scrollHeight;
}

function seleccionarOpcionGuiada(clave) {
    if (clave === 'refugio' || clave === 'veterinaria') {
        renderizarMensaje(`Buscando ${clave === 'refugio' ? 'refugios 🏠' : 'veterinarias 🏥'} en el mapa...`, 'user');
        setTimeout(() => {
            filtrarLugares(clave);
            document.querySelector('.chatbot-widget').classList.remove('open');
            renderizarMensaje(`¡Listo! Activé el filtro de <strong>${clave === 'refugio' ? 'Refugios' : 'Veterinarias'}</strong> en el mapa. Haz scroll hacia abajo para verlos 📍`, 'bot');
        }, 400);
        return;
    }
    const textos = { alimentacion:"alimentacion", vacunas:"vacunas", ley:"ley cholito" };
    renderizarMensaje("Consultando: " + clave.toUpperCase(), 'user');
    setTimeout(() => {
        renderizarMensaje(analizarMensaje(textos[clave] || clave), 'bot');
        const contenedor = document.getElementById("chatbot-messages");
        const volver = document.createElement("div");
        volver.innerHTML = `<span style="color:#3d7a4f;font-size:11px;cursor:pointer;text-decoration:underline;display:block;margin-top:5px;font-weight:700;">← Ver otras opciones</span>`;
        volver.onclick = () => mostrarSaludoConBotones();
        contenedor.appendChild(volver);
        contenedor.scrollTop = contenedor.scrollHeight;
    }, 400);
}

function evaluarEnter(e)     { if (e.key === "Enter") enviarMensajeUsuario(); }
function enviarMensajeUsuario() {
    const input = document.getElementById("chatbot-input");
    const texto = input.value.trim();
    if (!texto) return;
    renderizarMensaje(texto, 'user');
    input.value = "";
    setTimeout(() => renderizarMensaje(analizarMensaje(texto), 'bot'), 500);
}

function renderizarMensaje(texto, remitente) {
    const contenedor = document.getElementById("chatbot-messages");
    if (!contenedor) return;
    const globo = document.createElement("div");
    globo.className = remitente === 'user' ? 'msg-user' : 'msg-bot';
    globo.innerHTML = texto;
    contenedor.appendChild(globo);
    contenedor.scrollTop = contenedor.scrollHeight;
}

function analizarMensaje(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hola")||msg.includes("buenos")||msg.includes("buenas")) return "¡Hola! 🐾 ¿Cómo te puedo asistir hoy?";
    if (msg.includes("alimentacion")||msg.includes("comida")||msg.includes("comer")||msg.includes("alimento"))
        return "🍖 <strong>Guía de Alimentación Responsable:</strong><br><br>• <strong>Cachorros:</strong> Pellet de crecimiento alto en proteínas, 3 a 4 veces al día.<br>• <strong>Adultos:</strong> Dos porciones reguladas según su peso.<br>• <strong>Tóxicos letales:</strong> Chocolate, uvas, cebolla, ajo y huesos cocidos.";
    if (msg.includes("cuidado")||msg.includes("salud")||msg.includes("vacuna")||msg.includes("veterinario"))
        return "🩺 <strong>Cuidados y Salud Preventiva:</strong><br><br>• <strong>Perros:</strong> Vacuna Óctuple/Séxtuple y Antirrábica anual.<br>• <strong>Gatos:</strong> Vacuna Triple Felina y Antirrábica.<br>• <strong>Parásitos:</strong> Antipulgas mensual, desparasitación interna cada 3 meses.";
    if (msg.includes("tenencia")||msg.includes("ley")||msg.includes("cholito")||msg.includes("legal"))
        return "📜 <strong>Ley de Tenencia Responsable (Ley Cholito):</strong><br><br>• <strong>Microchip:</strong> Obligatorio antes de los 6 meses e inscripción en Registro Nacional.<br>• <strong>Obligaciones:</strong> Alimentación, albergue y buen trato. El dueño responde por daños civiles.<br>• <strong>Delito:</strong> El abandono y maltrato se castigan con multas y cárcel.";
    if (msg.includes("refugio")||msg.includes("shelter")) return "🏠 Activando filtro de <strong>Refugios</strong> en el mapa. ¡Cierra el chat y haz scroll!";
    if (msg.includes("veterinaria")||msg.includes("clinica")||msg.includes("clínica")) return "🏥 Activando filtro de <strong>Veterinarias</strong> en el mapa. ¡Cierra el chat y haz scroll!";
    if (msg.includes("gracias")||msg.includes("adios")||msg.includes("chao")) return "¡Un placer ayudarte! Proteger a quienes no tienen voz es tarea de todos. 🐾❤️";
    return "🤖 No logré entender del todo. Prueba con: <strong>'alimentación'</strong>, <strong>'vacunas'</strong>, <strong>'ley cholito'</strong>, <strong>'refugio'</strong> o <strong>'veterinaria'</strong>.";
}
// =========================================================================
// MENÚ HAMBURGUESA
// =========================================================================
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const btn  = document.getElementById('btn-hamburguesa');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
}

document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('open');
        document.getElementById('btn-hamburguesa').classList.remove('open');
    });
});
// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('open');
        document.getElementById('btn-hamburguesa').classList.remove('open');
    });
});
function manejarClickLogin() {
    document.querySelector('.menu').classList.remove('open');
    document.getElementById('btn-hamburguesa').classList.remove('open');
    if (usuarioActual) {
        abrirModalPerfil();
    } else {
        abrirModalLogin();
    }
}
function abrirModalPerfil() {
    const nombre = usuarioActual.displayName || usuarioActual.email.split("@")[0];
    const correo = usuarioActual.email;

    document.getElementById("perfil-nombre").innerText = "👋 " + nombre;
    document.getElementById("perfil-correo").innerText = correo;

    // Contar reportes del usuario
    const misReportes = reportesRealTime.filter(r => r.uid === usuarioActual.uid);
    const totalReportes = misReportes.length;
    const puntos = totalReportes * 10;

    document.getElementById("perfil-reportes").innerText = totalReportes;
    document.getElementById("perfil-puntos").innerText = puntos;

    // Nivel según puntos
    let nivel = "🐣 Básico";
    if (puntos >= 50)  nivel = "🥈 Plata";
    if (puntos >= 100) nivel = "🥇 Oro";
    if (puntos >= 200) nivel = "💎 Platino";
    if (puntos >= 500) nivel = "🦸 Héroe";
    document.getElementById("perfil-nivel").innerText = nivel;

    // Logros
    const logros = [];
    if (totalReportes >= 1)  logros.push("🐾 Primer reporte publicado");
    if (totalReportes >= 5)  logros.push("⭐ 5 reportes publicados");
    if (totalReportes >= 10) logros.push("🏆 10 reportes publicados");
    if (logros.length === 0) logros.push("📋 Publica tu primer reporte para ganar logros");

    document.getElementById("perfil-logros-lista").innerHTML = logros
        .map(l => `<div class="logro-item">${l}</div>`).join("");

    // Mis reportes
    const listaHTML = misReportes.length === 0
        ? `<div class="perfil-reporte-item">Aún no has publicado reportes</div>`
        : misReportes.map(r => `
            <div class="perfil-reporte-item">
                <strong>${r.titulo}</strong> · ${r.comuna} · ${r.fecha}
            </div>`).join("");

    document.getElementById("perfil-reportes-lista").innerHTML = listaHTML;

    document.getElementById("modal-perfil").classList.add("open");
}

function cerrarSesion() {
    auth.signOut();
    cerrarModales();
    mostrarToast("👋 Sesión cerrada correctamente");
}
async function eliminarReporte(id) {
    if (!confirm("¿Estás seguro que quieres eliminar este reporte?")) return;
    try {
        await db.collection("reportes").doc(id).delete();
        mostrarToast("🗑️ Reporte eliminado correctamente.");
    } catch (error) {
        console.error("[Firestore] Error eliminando:", error);
        mostrarToast("No se pudo eliminar el reporte.");
    }
}