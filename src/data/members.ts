// ─────────────────────────────────────────────────────────────
//  Daftar member JAYA E-SPORT.
//
//  Tambah member  → tambahkan satu baris di daftar ini.
//  Hapus member   → hapus barisnya.
//  Ganti peran    → ubah role jadi 'CEO', 'Admin', atau 'Member'.
//
//  Kolom opsional:
//    gamingId: 'JAYA#1234'
//    photo:    '/members/nama-file.jpg'   (simpan fotonya di public/members/)
//
//  Jumlah total dan filter peran di halaman dihitung otomatis dari daftar ini.
//  Nama di bawah masih placeholder — ganti dengan nama asli.
// ─────────────────────────────────────────────────────────────

export type Role = 'CEO' | 'Admin' | 'Member';

export interface Member {
  name: string;
  role: Role;
  gamingId?: string;
  photo?: string;
}

export const members: Member[] = [
  { name: 'CEO 01', role: 'CEO' },
  { name: 'CEO 02', role: 'CEO' },
  { name: 'CEO 03', role: 'CEO' },

  { name: 'Admin 01', role: 'Admin' },
  { name: 'Admin 02', role: 'Admin' },
  { name: 'Admin 03', role: 'Admin' },
  { name: 'Admin 04', role: 'Admin' },

  { name: 'Member 01', role: 'Member' },
  { name: 'Member 02', role: 'Member' },
  { name: 'Member 03', role: 'Member' },
  { name: 'Member 04', role: 'Member' },
  { name: 'Member 05', role: 'Member' },
  { name: 'Member 06', role: 'Member' },
  { name: 'Member 07', role: 'Member' },
  { name: 'Member 08', role: 'Member' },
  { name: 'Member 09', role: 'Member' },
  { name: 'Member 10', role: 'Member' },
  { name: 'Member 11', role: 'Member' },
  { name: 'Member 12', role: 'Member' },
  { name: 'Member 13', role: 'Member' },
  { name: 'Member 14', role: 'Member' },
  { name: 'Member 15', role: 'Member' },
  { name: 'Member 16', role: 'Member' },
  { name: 'Member 17', role: 'Member' },
  { name: 'Member 18', role: 'Member' },
  { name: 'Member 19', role: 'Member' },
  { name: 'Member 20', role: 'Member' },
  { name: 'Member 21', role: 'Member' },
  { name: 'Member 22', role: 'Member' },
  { name: 'Member 23', role: 'Member' },
];
