// ─────────────────────────────────────────────────────────────
//  Daftar member JAYA E-SPORT.
//
//  Tambah member  → tambahkan satu baris di daftar ini.
//  Hapus member   → hapus barisnya.
//  Ganti peran    → ubah role jadi 'CEO', 'Admin', 'Komisaris', atau 'Member'.
//
//  Kolom opsional:
//    gamingId: 'JAYA#1234'
//    photo:    '/members/nama-file.jpg'   (simpan fotonya di public/members/)
//
//  Jumlah total dan filter peran di halaman dihitung otomatis dari daftar ini.
// ─────────────────────────────────────────────────────────────

export type Role = 'CEO' | 'Admin' | 'Komisaris' | 'Member';

export interface Member {
  name: string;
  role: Role;
  gamingId?: string;
  photo?: string;
}

export const members: Member[] = [
  { name: 'Bagas', role: 'CEO' },
  { name: 'Jovan', role: 'CEO' },
  { name: 'Rafi', role: 'CEO' },

  { name: 'Rafli', role: 'Admin' },
  { name: 'Fabian', role: 'Admin' },
  { name: 'Theresia', role: 'Admin' },
  { name: 'Linggar', role: 'Admin' },

  { name: 'Rama', role: 'Komisaris' },

  { name: 'Rigen', role: 'Member' },
  { name: 'Raihan', role: 'Member' },
  { name: 'Fathir', role: 'Member' },
  { name: 'Haryo', role: 'Member' },
  { name: 'Rafi', role: 'Member' },
  { name: 'Akbarudin', role: 'Member' },
  { name: 'Fathan', role: 'Member' },
  { name: 'Rendi', role: 'Member' },
  { name: 'Elisabeth', role: 'Member' },
  { name: 'Azka', role: 'Member' },
  { name: 'Tristan', role: 'Member' },
  { name: 'Gibran', role: 'Member' },
  { name: 'Razan', role: 'Member' },
  { name: 'Arya Bima', role: 'Member' },
  { name: 'Adjil', role: 'Member' },
  { name: 'Wisnu', role: 'Member' },
  { name: 'Bimo', role: 'Member' },
  { name: 'Sakti', role: 'Member' },
  { name: 'Gregory', role: 'Member' },
  { name: 'Fawwaz', role: 'Member' },
  { name: 'Farel', role: 'Member' },
  { name: 'Sabila', role: 'Member' },
];
