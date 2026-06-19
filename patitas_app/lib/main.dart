import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:image_picker/image_picker.dart';
import 'package:geolocator/geolocator.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const PatitasApp());
}

const kVerde = Color(0xFF2d5a3d);
const kVerdeClaro = Color(0xFF4a7c59);
const kVerdeDark = Color(0xFF1e3a2a);
const kFondo = Color(0xFFf0ebe1);
const kRojo = Color(0xFFe53e3e);
const kAmarillo = Color(0xFFd69e2e);

class PatitasApp extends StatelessWidget {
  const PatitasApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Patitas al Rescate',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: kVerde),
        useMaterial3: true,
        scaffoldBackgroundColor: kFondo,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});
  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: const [InicioScreen(), MapaScreen(), AdopcionesScreen(), PerfilScreen()],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 16, offset: const Offset(0, -2))],
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          selectedItemColor: kVerde,
          unselectedItemColor: Colors.grey[400],
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.transparent,
          elevation: 0,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 11),
          onTap: (i) => setState(() => _currentIndex = i),
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: 'Inicio'),
            BottomNavigationBarItem(icon: Icon(Icons.map_rounded), label: 'Mapa'),
            BottomNavigationBarItem(icon: Icon(Icons.favorite_rounded), label: 'Adoptar'),
            BottomNavigationBarItem(icon: Icon(Icons.person_rounded), label: 'Perfil'),
          ],
        ),
      ),
    );
  }
}

// ─── HELPERS ────────────────────────────────────────────────
Color _colorEstado(String estado) {
  switch (estado) {
    case 'Urgente': return kRojo;
    case 'Atención': return kAmarillo;
    case 'adopcion': return kVerde;
    default: return Colors.blue;
  }
}

IconData _iconoEstado(String estado) {
  switch (estado) {
    case 'Urgente': return Icons.warning_rounded;
    case 'Atención': return Icons.info_rounded;
    case 'adopcion': return Icons.favorite_rounded;
    default: return Icons.pets;
  }
}

// Lee coordenadas tanto del formato nuevo (lat/lng) como del viejo (coords array)
double _getLat(Map<String, dynamic> data) {
  if (data['lat'] != null) return (data['lat'] as num).toDouble();
  if (data['coords'] is List && (data['coords'] as List).isNotEmpty) {
    return ((data['coords'] as List)[0] as num).toDouble();
  }
  return -33.4489;
}

double _getLng(Map<String, dynamic> data) {
  if (data['lng'] != null) return (data['lng'] as num).toDouble();
  if (data['coords'] is List && (data['coords'] as List).length > 1) {
    return ((data['coords'] as List)[1] as num).toDouble();
  }
  return -70.6693;
}

Future<Position?> _obtenerUbicacion() async {
  bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) return null;
  LocationPermission permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) return null;
  }
  if (permission == LocationPermission.deniedForever) return null;
  return await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
}

// ─── INICIO ─────────────────────────────────────────────────
class InicioScreen extends StatelessWidget {
  const InicioScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        final user = snapshot.data;
        return CustomScrollView(
          slivers: [
            SliverAppBar(
              expandedHeight: 160,
              floating: false,
              pinned: true,
              backgroundColor: kVerdeDark,
              flexibleSpace: FlexibleSpaceBar(
                background: Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [kVerdeDark, kVerde, kVerdeClaro],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 56, 20, 16),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text('Hola, ${user?.displayName?.split(' ').first ?? 'bienvenido'} 👋',
                              style: const TextStyle(color: Colors.white70, fontSize: 13)),
                          const SizedBox(height: 2),
                          const Text('Patitas al Rescate 🐾',
                              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                        ]),
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: Colors.white.withOpacity(0.15),
                          child: Text(
                            (user?.displayName ?? 'U')[0].toUpperCase(),
                            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                          ),
                        ),
                      ]),
                      const SizedBox(height: 14),
                      Row(children: [
                        _heroStat(context, '🚨', 'Urgentes', 'Urgente'),
                        const SizedBox(width: 10),
                        _heroStat(context, '❤️', 'Adopción', 'adopcion'),
                      ]),
                    ]),
                  ),
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Text('Acciones rápidas', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  Row(children: [
                    _accion(context, '🚨', 'Reportar', 'Animal en peligro', kRojo, () {
                      if (user == null) {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Inicia sesión para reportar')));
                        return;
                      }
                      showModalBottomSheet(context: context, isScrollControlled: true,
                        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
                        builder: (_) => const FormReporte());
                    }),
                    const SizedBox(width: 10),
                    _accion(context, '❤️', 'Adoptar', 'Ver disponibles', Colors.pink, () {}),
                  ]),
                  const SizedBox(height: 10),
                  Row(children: [
                    _accion(context, '🗺️', 'Mapa', 'Ver reportes', kVerde, () {}),
                    const SizedBox(width: 10),
                    _accion(context, '👤', 'Perfil', 'Mis logros', Colors.blue, () {}),
                  ]),
                  const SizedBox(height: 22),
                  const Text('Actividad reciente', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  StreamBuilder<QuerySnapshot>(
                    stream: FirebaseFirestore.instance.collection('reportes')
                        .orderBy('createdAt', descending: true).limit(5).snapshots(),
                    builder: (context, snapshot) {
                      final docs = snapshot.data?.docs ?? [];
                      if (docs.isEmpty) return const Center(child: Padding(
                        padding: EdgeInsets.all(24),
                        child: Text('Sin actividad reciente 🐾', style: TextStyle(color: Colors.grey)),
                      ));
                      return Column(
                        children: docs.map((doc) {
                          final d = doc.data() as Map<String, dynamic>;
                          final estado = d['estado'] ?? '';
                          final fotoUrl = d['fotoUrl'] as String?;
                          return Container(
                            margin: const EdgeInsets.only(bottom: 10),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(16),
                              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
                            ),
                            child: Row(children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(12),
                                child: fotoUrl != null
                                    ? Image.network(fotoUrl, width: 52, height: 52, fit: BoxFit.cover,
                                        errorBuilder: (_, __, ___) => _iconBox(estado))
                                    : _iconBox(estado),
                              ),
                              const SizedBox(width: 12),
                              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                                Text(d['titulo'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                                    maxLines: 1, overflow: TextOverflow.ellipsis),
                                const SizedBox(height: 2),
                                Text('📍 ${d['comuna'] ?? ''}', style: const TextStyle(color: Colors.grey, fontSize: 11)),
                              ])),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _colorEstado(estado).withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(estado, style: TextStyle(color: _colorEstado(estado), fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                            ]),
                          );
                        }).toList(),
                      );
                    },
                  ),
                ]),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _heroStat(BuildContext context, String emoji, String label, String filtro) {
    return Expanded(
      child: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance.collection('reportes').where('estado', isEqualTo: filtro).snapshots(),
        builder: (context, snapshot) {
          final count = snapshot.data?.docs.length ?? 0;
          return Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.12),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(children: [
              Text(emoji, style: const TextStyle(fontSize: 20)),
              const SizedBox(width: 8),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('$count', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                Text(label, style: const TextStyle(color: Colors.white70, fontSize: 10)),
              ]),
            ]),
          );
        },
      ),
    );
  }

  Widget _accion(BuildContext context, String emoji, String titulo, String sub, Color color, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
          ),
          child: Row(children: [
            Container(
              width: 44, height: 44,
              decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
              child: Center(child: Text(emoji, style: const TextStyle(fontSize: 22))),
            ),
            const SizedBox(width: 10),
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(titulo, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              Text(sub, style: const TextStyle(color: Colors.grey, fontSize: 10)),
            ]),
          ]),
        ),
      ),
    );
  }

  Widget _iconBox(String estado) {
    return Container(
      width: 52, height: 52,
      decoration: BoxDecoration(color: _colorEstado(estado).withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
      child: Icon(_iconoEstado(estado), color: _colorEstado(estado), size: 26),
    );
  }
}

// ─── MAPA ───────────────────────────────────────────────────
class MapaScreen extends StatefulWidget {
  const MapaScreen({super.key});
  @override
  State<MapaScreen> createState() => _MapaScreenState();
}

class _MapaScreenState extends State<MapaScreen> {
  String _filtro = 'todo';
  final MapController _mapController = MapController();

  Future<void> _irAMiUbicacion() async {
    final pos = await _obtenerUbicacion();
    if (pos != null) {
      _mapController.move(LatLng(pos.latitude, pos.longitude), 14);
    }
  }

  void _mostrarDetalle(BuildContext context, Map<String, dynamic> data) {
    final estado = data['estado'] ?? '';
    final fotoUrl = data['fotoUrl'] as String?;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: SingleChildScrollView(
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const SizedBox(height: 12),
            Container(width: 36, height: 4, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(2))),
            const SizedBox(height: 12),
            // Foto
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(18),
                child: fotoUrl != null
                    ? Image.network(fotoUrl, width: double.infinity, height: 190, fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => _fotoPlaceholder(estado))
                    : _fotoPlaceholder(estado),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text(data['titulo'] ?? '', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(color: _colorEstado(estado).withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
                    child: Text(estado, style: TextStyle(color: _colorEstado(estado), fontSize: 12, fontWeight: FontWeight.bold)),
                  ),
                ]),
                const SizedBox(height: 8),
                Row(children: [
                  Icon(Icons.location_on, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(data['comuna'] ?? '', style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                  const SizedBox(width: 16),
                  Icon(Icons.person, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(data['autor'] ?? 'Anónimo', style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                ]),
                if ((data['descripcion'] ?? '').isNotEmpty) ...[
                  const SizedBox(height: 10),
                  Text(data['descripcion'] ?? '', style: const TextStyle(fontSize: 14, color: Color(0xFF444444), height: 1.5)),
                ],
                const SizedBox(height: 16),
                if (estado == 'adopcion') ...[
                  SizedBox(width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(backgroundColor: kVerde, padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
                      icon: const Icon(Icons.favorite, color: Colors.white),
                      label: const Text('Quiero adoptarle', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ),
                ] else ...[
                  Row(children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF25d366),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                        icon: const Icon(Icons.chat, color: Colors.white, size: 18),
                        label: const Text('WhatsApp', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF4285f4),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                        icon: const Icon(Icons.directions, color: Colors.white, size: 18),
                        label: const Text('Cómo llegar', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ),
                  ]),
                ],
              ]),
            ),
          ]),
        ),
      ),
    );
  }

  Widget _fotoPlaceholder(String estado) {
    return Container(
      width: double.infinity, height: 190,
      color: _colorEstado(estado).withOpacity(0.08),
      child: Center(child: Icon(_iconoEstado(estado), size: 60, color: _colorEstado(estado).withOpacity(0.4))),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          StreamBuilder<QuerySnapshot>(
            stream: FirebaseFirestore.instance.collection('reportes').snapshots(),
            builder: (context, snapshot) {
              final docs = snapshot.data?.docs ?? [];
              final filtrados = _filtro == 'todo' ? docs
                  : docs.where((d) => (d['estado'] ?? '') == _filtro).toList();
              final markers = filtrados.map((doc) {
                final data = doc.data() as Map<String, dynamic>;
                final lat = _getLat(data);
                final lng = _getLng(data);
                final estado = data['estado'] ?? '';
                return Marker(
                  point: LatLng(lat, lng), width: 46, height: 46,
                  child: GestureDetector(
                    onTap: () => _mostrarDetalle(context, data),
                    child: Container(
                      decoration: BoxDecoration(
                        color: _colorEstado(estado),
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: _colorEstado(estado).withOpacity(0.45), blurRadius: 10, spreadRadius: 2)],
                      ),
                      child: Icon(_iconoEstado(estado), color: Colors.white, size: 22),
                    ),
                  ),
                );
              }).toList();
              return FlutterMap(
                mapController: _mapController,
                options: const MapOptions(initialCenter: LatLng(-33.4489, -70.6693), initialZoom: 11),
                children: [
                  TileLayer(urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', userAgentPackageName: 'com.patitas.app'),
                  MarkerLayer(markers: markers),
                ],
              );
            },
          ),
          // Filtros
          Positioned(
            top: MediaQuery.of(context).padding.top + 12,
            left: 12, right: 12,
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(30),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 12)],
              ),
              child: Row(children: [
                _filtroBtn('Todo', 'todo'),
                _filtroBtn('🔴', 'Urgente'),
                _filtroBtn('🟡 Atención', 'Atención'),
                _filtroBtn('🟢', 'adopcion'),
              ]),
            ),
          ),
          // Botón mi ubicación
          Positioned(
            bottom: 90, right: 16,
            child: FloatingActionButton(
              heroTag: 'ubicacion',
              mini: true,
              backgroundColor: Colors.white,
              onPressed: _irAMiUbicacion,
              child: const Icon(Icons.my_location, color: kVerde),
            ),
          ),
          // FAB Reportar
          Positioned(
            bottom: 20, right: 16,
            child: FloatingActionButton.extended(
              heroTag: 'reportar',
              backgroundColor: kVerde,
              icon: const Icon(Icons.add, color: Colors.white),
              label: const Text('Reportar', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              onPressed: () {
                final user = FirebaseAuth.instance.currentUser;
                if (user == null) {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Inicia sesión para reportar')));
                  return;
                }
                showModalBottomSheet(context: context, isScrollControlled: true,
                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
                  builder: (_) => const FormReporte());
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _filtroBtn(String label, String valor) {
    final selected = _filtro == valor;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _filtro = valor),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: selected ? kVerde : Colors.transparent,
            borderRadius: BorderRadius.circular(26),
          ),
          child: Text(label, textAlign: TextAlign.center,
              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600,
                  color: selected ? Colors.white : Colors.grey[600])),
        ),
      ),
    );
  }
}

// ─── ADOPCIONES ─────────────────────────────────────────────
class AdopcionesScreen extends StatelessWidget {
  const AdopcionesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kFondo,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 110,
            pinned: true,
            backgroundColor: kVerdeDark,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(colors: [kVerdeDark, kVerdeClaro], begin: Alignment.topLeft, end: Alignment.bottomRight),
                ),
                child: const Padding(
                  padding: EdgeInsets.fromLTRB(20, 56, 20, 12),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text('Adopciones 🐾', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                    Text('Encuentra tu compañero ideal', style: TextStyle(color: Colors.white70, fontSize: 12)),
                  ]),
                ),
              ),
            ),
          ),
          StreamBuilder<QuerySnapshot>(
            stream: FirebaseFirestore.instance.collection('reportes').where('estado', isEqualTo: 'adopcion').snapshots(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const SliverFillRemaining(child: Center(child: CircularProgressIndicator(color: kVerde)));
              }
              final docs = snapshot.data?.docs ?? [];
              if (docs.isEmpty) {
                return const SliverFillRemaining(
                  child: Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Text('🐾', style: TextStyle(fontSize: 60)),
                    SizedBox(height: 12),
                    Text('No hay animales en adopción', style: TextStyle(fontSize: 16, color: Colors.grey)),
                  ])),
                );
              }
              return SliverPadding(
                padding: const EdgeInsets.all(14),
                sliver: SliverGrid(
                  delegate: SliverChildBuilderDelegate((context, i) {
                    final data = docs[i].data() as Map<String, dynamic>;
                    final fotoUrl = data['fotoUrl'] as String?;
                    return Container(
                      decoration: BoxDecoration(
                        color: Colors.white, borderRadius: BorderRadius.circular(18),
                        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 12)],
                      ),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        ClipRRect(
                          borderRadius: const BorderRadius.vertical(top: Radius.circular(18)),
                          child: fotoUrl != null
                              ? Image.network(fotoUrl, height: 120, width: double.infinity, fit: BoxFit.cover,
                                  errorBuilder: (_, __, ___) => _placeholder())
                              : _placeholder(),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                            Text(data['titulo'] ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                maxLines: 1, overflow: TextOverflow.ellipsis),
                            Text('📍 ${data['comuna'] ?? ''}', style: const TextStyle(color: Colors.grey, fontSize: 11)),
                            const SizedBox(height: 8),
                            SizedBox(width: double.infinity,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: kVerde, padding: const EdgeInsets.symmetric(vertical: 8),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                                onPressed: () {},
                                child: const Text('Adoptar', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                              ),
                            ),
                          ]),
                        ),
                      ]),
                    );
                  }, childCount: docs.length),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2, childAspectRatio: 0.75, crossAxisSpacing: 12, mainAxisSpacing: 12),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _placeholder() => Container(
    height: 120, color: kVerde.withOpacity(0.08),
    child: const Center(child: Text('🐾', style: TextStyle(fontSize: 44))),
  );
}

// ─── FORMULARIO REPORTE ─────────────────────────────────────
class FormReporte extends StatefulWidget {
  const FormReporte({super.key});
  @override
  State<FormReporte> createState() => _FormReporteState();
}

class _FormReporteState extends State<FormReporte> {
  final _titulo = TextEditingController();
  final _comuna = TextEditingController();
  final _desc = TextEditingController();
  String _estado = 'Urgente';
  bool _cargando = false;
  XFile? _foto;
  String _estadoUbicacion = 'Obteniendo ubicación...';
  Position? _posicion;

  @override
  void initState() {
    super.initState();
    _obtenerPosicion();
  }

  Future<void> _obtenerPosicion() async {
    final pos = await _obtenerUbicacion();
    if (mounted) setState(() {
      _posicion = pos;
      _estadoUbicacion = pos != null ? '📍 Ubicación obtenida' : '⚠️ No se pudo obtener ubicación';
    });
  }

  Future<void> _tomarFoto(ImageSource source) async {
    final foto = await ImagePicker().pickImage(source: source, imageQuality: 75, maxWidth: 1080);
    if (foto != null && mounted) setState(() => _foto = foto);
  }

  void _elegirFoto() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          ListTile(leading: const Icon(Icons.camera_alt, color: kVerde), title: const Text('Tomar foto ahora'),
              onTap: () { Navigator.pop(context); _tomarFoto(ImageSource.camera); }),
          ListTile(leading: const Icon(Icons.photo_library, color: kVerde), title: const Text('Elegir de galería'),
              onTap: () { Navigator.pop(context); _tomarFoto(ImageSource.gallery); }),
        ]),
      ),
    );
  }

Future<String?> _subirFotoCloudinary(XFile foto) async {
  try {
    print('🔍 Leyendo bytes de la foto...');
    final bytes = await foto.readAsBytes();
    print('✅ Bytes leídos: ${bytes.length}');
    
    final uri = Uri.parse('https://api.cloudinary.com/v1_1/dthvcfn7y/image/upload');
    final request = http.MultipartRequest('POST', uri);
    request.fields['upload_preset'] = 'patitas_preset';
    request.fields['api_key'] = '875372232687493';
    request.files.add(http.MultipartFile.fromBytes('file', bytes, filename: 'foto.jpg'));
    
    print('📤 Enviando a Cloudinary...');
    final response = await request.send();
    final body = await response.stream.bytesToString();
    print('📥 Respuesta recibida: $body');
    
    final json = jsonDecode(body);
    return json['secure_url'] as String?;
  } catch (e) {
    print('❌ Error en Cloudinary: $e');
    return null;
  }
}

  Future<void> _publicar() async {
  if (_titulo.text.isEmpty || _comuna.text.isEmpty) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Completa título y comuna')));
    return;
  }
  setState(() => _cargando = true);
  final user = FirebaseAuth.instance.currentUser;
  String? fotoUrl;

  // Intentar subir foto si existe
  if (_foto != null) {
    try {
      print('📸 Intentando subir foto a Cloudinary...');
      fotoUrl = await _subirFotoCloudinary(_foto!);
      print('✅ Foto subida: $fotoUrl');
    } catch (e) {
      print('❌ Error en Cloudinary: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error al subir foto: $e')));
      }
      setState(() => _cargando = false);
      return; // Detener aquí si falla la foto
    }
  }
  
  // Guardar en Firestore
  try {
    print('📝 Guardando en Firestore...');
    await FirebaseFirestore.instance.collection('reportes').add({
      'titulo': _titulo.text.trim(),
      'estado': _estado,
      'comuna': _comuna.text.trim(),
      'descripcion': _desc.text.trim(),
      'lat': _posicion?.latitude ?? -33.4489,
      'lng': _posicion?.longitude ?? -70.6693,
      'coords': [_posicion?.latitude ?? -33.4489, _posicion?.longitude ?? -70.6693],
      'fotoUrl': fotoUrl,
      'uid': user?.uid,
      'autor': user?.displayName ?? 'Anónimo',
      'createdAt': FieldValue.serverTimestamp(),
    });
    print('✅ Reporte publicado exitosamente');
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('🎉 Reporte publicado')));
      Navigator.pop(context);
    }
  } catch (e) {
    print('❌ Error en Firestore: $e');
    if (mounted) {
      setState(() => _cargando = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al publicar: $e')));
    }
  }
}

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom, left: 20, right: 20, top: 16),
      child: SingleChildScrollView(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(width: 36, height: 4, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 14),
          const Text('Reportar Animal', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 14),
          GestureDetector(
            onTap: _elegirFoto,
            child: Container(
              width: double.infinity, height: 150,
              decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey[300]!)),
child: _foto != null
    ? ClipRRect(borderRadius: BorderRadius.circular(16),
        child: FutureBuilder<Uint8List>(
          future: _foto!.readAsBytes(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Image.memory(snapshot.data!, fit: BoxFit.cover);
            }
            return const Center(child: CircularProgressIndicator());
          },
        ))
    : Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                      Icon(Icons.camera_alt_rounded, size: 38, color: Colors.grey[400]),
                      const SizedBox(height: 6),
                      Text('Toca para agregar foto', style: TextStyle(color: Colors.grey[500], fontSize: 13)),
                    ]),
            ),
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: _posicion != null ? kVerde.withOpacity(0.08) : kAmarillo.withOpacity(0.08),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(children: [
              Icon(_posicion != null ? Icons.location_on : Icons.location_off,
                  color: _posicion != null ? kVerde : kAmarillo, size: 16),
              const SizedBox(width: 8),
              Text(_estadoUbicacion, style: TextStyle(fontSize: 12,
                  color: _posicion != null ? kVerde : kAmarillo, fontWeight: FontWeight.w500)),
            ]),
          ),
          const SizedBox(height: 10),
          TextField(controller: _titulo, decoration: InputDecoration(labelText: 'Título del reporte',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.grey[50])),
          const SizedBox(height: 8),
          DropdownButtonFormField<String>(
            value: _estado,
            decoration: InputDecoration(border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                filled: true, fillColor: Colors.grey[50]),
            items: const [
              DropdownMenuItem(value: 'Urgente', child: Text('🔴 Urgente')),
              DropdownMenuItem(value: 'Atención', child: Text('🟡 Atención')),
              DropdownMenuItem(value: 'adopcion', child: Text('🟢 En Adopción')),
            ],
            onChanged: (v) => setState(() => _estado = v!),
          ),
          const SizedBox(height: 8),
          TextField(controller: _comuna, decoration: InputDecoration(labelText: 'Comuna',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.grey[50])),
          const SizedBox(height: 8),
          TextField(controller: _desc, maxLines: 2, decoration: InputDecoration(labelText: 'Descripción',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.grey[50])),
          const SizedBox(height: 14),
          SizedBox(width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: kVerde,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
              onPressed: _cargando ? null : _publicar,
              child: _cargando
                  ? const Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                      SizedBox(width: 18, height: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)),
                      SizedBox(width: 10),
                      Text('Publicando...', style: TextStyle(color: Colors.white, fontSize: 15)),
                    ])
                  : const Text('Publicar Reporte', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            ),
          ),
          const SizedBox(height: 20),
        ]),
      ),
    );
  }
}

// ─── PERFIL ─────────────────────────────────────────────────
class PerfilScreen extends StatefulWidget {
  const PerfilScreen({super.key});
  @override
  State<PerfilScreen> createState() => _PerfilScreenState();
}

class _PerfilScreenState extends State<PerfilScreen> {
  final _email = TextEditingController();
  final _pass = TextEditingController();
  final _nombre = TextEditingController();
  bool _modoRegistro = false;
  String _error = '';

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        final user = snapshot.data;
        if (user != null) return _perfilLogueado(user);
        return _formLogin();
      },
    );
  }

  Widget _perfilLogueado(User user) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          expandedHeight: 200,
          pinned: true,
          backgroundColor: kVerdeDark,
          flexibleSpace: FlexibleSpaceBar(
            background: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(colors: [kVerdeDark, kVerdeClaro], begin: Alignment.topLeft, end: Alignment.bottomRight),
              ),
              child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                const SizedBox(height: 40),
                CircleAvatar(
                  radius: 42,
                  backgroundColor: Colors.white.withOpacity(0.15),
                  child: Text((user.displayName ?? 'U')[0].toUpperCase(),
                      style: const TextStyle(color: Colors.white, fontSize: 34, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(height: 10),
                Text(user.displayName ?? 'Usuario',
                    style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                Text(user.email ?? '', style: const TextStyle(color: Colors.white70, fontSize: 12)),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(20)),
                  child: const Text('🐾 Rescatador activo', style: TextStyle(color: Colors.white, fontSize: 11)),
                ),
              ]),
            ),
          ),
        ),
        SliverToBoxAdapter(
          child: Column(children: [
            // Stats flotantes
            Transform.translate(
              offset: const Offset(0, -20),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: StreamBuilder<QuerySnapshot>(
                  stream: FirebaseFirestore.instance.collection('reportes').where('uid', isEqualTo: user.uid).snapshots(),
                  builder: (context, snapshot) {
                    final count = snapshot.data?.docs.length ?? 0;
                    return Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18),
                          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 16)]),
                      child: Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
                        _statPerfil('$count', 'Reportes', Icons.pets, kVerde),
                        _divider(),
                        _statPerfil('0', 'Adopciones', Icons.favorite, Colors.pink),
                        _divider(),
                        _statPerfil('Bronce', 'Nivel', Icons.star, Colors.amber),
                      ]),
                    );
                  },
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: Column(children: [
                // Logros
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18),
                      boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)]),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    const Text('🏆 Logros', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 14),
                    Row(children: [
                      _logro('🐕', 'Primer rescate', true),
                      _logro('❤️', 'Adoptante', false),
                      _logro('⭐', 'Colaborador', false),
                      _logro('🏆', 'Héroe', false),
                    ]),
                  ]),
                ),
                const SizedBox(height: 12),
                // Menú
                Container(
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18),
                      boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)]),
                  child: Column(children: [
                    _menuItem('🐾', 'Mis reportes', const Color(0xFFf0fff4)),
                    _menuItem('❤️', 'Mis favoritos', const Color(0xFFfff0f5)),
                    _menuItem('🔔', 'Notificaciones', const Color(0xFFf0f5ff)),
                  ]),
                ),
                const SizedBox(height: 16),
                SizedBox(width: double.infinity,
                  child: OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 14),
                        side: const BorderSide(color: kRojo),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
                    icon: const Icon(Icons.logout, color: kRojo),
                    label: const Text('Cerrar sesión', style: TextStyle(color: kRojo, fontSize: 15, fontWeight: FontWeight.w600)),
                    onPressed: () => FirebaseAuth.instance.signOut(),
                  ),
                ),
              ]),
            ),
          ]),
        ),
      ],
    );
  }

  Widget _statPerfil(String valor, String label, IconData icon, Color color) {
    return Column(children: [
      Icon(icon, color: color, size: 26),
      const SizedBox(height: 4),
      Text(valor, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color)),
      Text(label, style: const TextStyle(fontSize: 10, color: Colors.grey)),
    ]);
  }

  Widget _divider() => Container(height: 36, width: 1, color: Colors.grey[200]);

  Widget _logro(String emoji, String label, bool desbloqueado) {
    return Expanded(child: Column(children: [
      Container(
        width: 52, height: 52,
        decoration: BoxDecoration(
          color: desbloqueado ? Colors.amber.withOpacity(0.15) : Colors.grey.withOpacity(0.08),
          shape: BoxShape.circle,
          border: desbloqueado ? Border.all(color: Colors.amber.withOpacity(0.4), width: 2) : null,
        ),
        child: Center(child: Text(desbloqueado ? emoji : '🔒', style: const TextStyle(fontSize: 22))),
      ),
      const SizedBox(height: 6),
      Text(label, textAlign: TextAlign.center,
          style: TextStyle(fontSize: 9, color: desbloqueado ? Colors.black87 : Colors.grey[400],
              fontWeight: desbloqueado ? FontWeight.w600 : FontWeight.normal)),
    ]));
  }

  Widget _menuItem(String emoji, String label, Color bg) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: Colors.grey[100]!))),
      child: Row(children: [
        Container(width: 36, height: 36, decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(10)),
            child: Center(child: Text(emoji, style: const TextStyle(fontSize: 17)))),
        const SizedBox(width: 12),
        Expanded(child: Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),
        Icon(Icons.chevron_right, color: Colors.grey[400], size: 20),
      ]),
    );
  }

  Widget _formLogin() {
    return Scaffold(
      backgroundColor: kFondo,
      appBar: AppBar(backgroundColor: kVerdeDark,
          title: Text(_modoRegistro ? 'Crear Cuenta' : 'Iniciar Sesión',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(children: [
          const SizedBox(height: 20),
          Container(width: 80, height: 80,
              decoration: BoxDecoration(color: kVerde.withOpacity(0.1), shape: BoxShape.circle),
              child: const Center(child: Text('🐾', style: TextStyle(fontSize: 40)))),
          const SizedBox(height: 24),
          if (_modoRegistro) ...[
            TextField(controller: _nombre,
                decoration: InputDecoration(labelText: 'Nombre completo', prefixIcon: const Icon(Icons.person),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.white)),
            const SizedBox(height: 12),
          ],
          TextField(controller: _email, keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(labelText: 'Correo electrónico', prefixIcon: const Icon(Icons.email),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.white)),
          const SizedBox(height: 12),
          TextField(controller: _pass, obscureText: true,
              decoration: InputDecoration(labelText: 'Contraseña', prefixIcon: const Icon(Icons.lock),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)), filled: true, fillColor: Colors.white)),
          if (_error.isNotEmpty) ...[
            const SizedBox(height: 8),
            Container(padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: kRojo.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                child: Text(_error, style: const TextStyle(color: kRojo))),
          ],
          const SizedBox(height: 20),
          SizedBox(width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: kVerde,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
              onPressed: _modoRegistro ? _registrar : _login,
              child: Text(_modoRegistro ? 'Registrarme' : 'Ingresar',
                  style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            ),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () => setState(() { _modoRegistro = !_modoRegistro; _error = ''; }),
            child: Text(_modoRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate',
                style: const TextStyle(color: kVerde)),
          ),
        ]),
      ),
    );
  }

  Future<void> _login() async {
    try {
      final cred = await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _email.text.trim(), password: _pass.text);
      if (!cred.user!.emailVerified) {
        await FirebaseAuth.instance.signOut();
        setState(() => _error = '📧 Verifica tu correo antes de ingresar');
      }
    } on FirebaseAuthException catch (e) {
      setState(() {
        if (e.code == 'user-not-found') _error = '❌ No existe cuenta con ese correo';
        else if (e.code == 'wrong-password' || e.code == 'invalid-credential') _error = '❌ Contraseña incorrecta';
        else _error = '❌ ${e.message}';
      });
    }
  }

  Future<void> _registrar() async {
    try {
      final cred = await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _email.text.trim(), password: _pass.text);
      await cred.user!.updateDisplayName(_nombre.text.trim());
      await cred.user!.sendEmailVerification();
      await FirebaseAuth.instance.signOut();
      setState(() => _error = '📧 Revisa tu correo (incluido spam) para verificar');
    } on FirebaseAuthException catch (e) {
      setState(() {
        if (e.code == 'email-already-in-use') _error = '❌ Este correo ya tiene cuenta';
        else if (e.code == 'weak-password') _error = '❌ Contraseña mínimo 6 caracteres';
        else _error = '❌ ${e.message}';
      });
    }
  }
}