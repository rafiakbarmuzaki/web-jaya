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
  { name: 'Bagas Pratama Putra', role: 'CEO' },
  { name: 'Jovansyah Lazuardi Adhan', role: 'CEO' },
  { name: 'Rafi Akbar Muzaki', role: 'CEO' },

  { name: 'Rafli Agung Prayoga', role: 'Admin' },
  { name: 'Fabian Erik Rasyid Islami', role: 'Admin' },
  { name: 'Theresia Carrysa Keiko Halim', role: 'Admin' },

  { name: 'Muhammad Ramadansyah Kurnia Putra', role: 'Komisaris' },

  { name: 'Rangga Nabil Ahmad', role: 'Member' },
  { name: 'Raihan Aqrabin Yasin', role: 'Member' },
  { name: 'Fathir Abizar Irawan', role: 'Member' },
  { name: 'Haryo Andhika Ramadhani', role: 'Member' },
  { name: 'Muhammad Rafi Rabbani', role: 'Member' },
  { name: 'Muhammad Akbarrudin', role: 'Member' },
  { name: 'Al Fathan Joan Ramadhan Sembiring', role: 'Member' },
  { name: 'Rendi Herlandi', role: 'Member' },
  { name: 'Elisabeth Vierprilianti Boimau', role: 'Member' },
  { name: 'Azka Niaji Rangkuti', role: 'Member' },
  { name: 'Rionaldo Tristan Sitio', role: 'Member' },
  { name: 'Gibran Abdillah', role: 'Member' },
  { name: 'Razan Muhammad Ihsan', role: 'Member' },
  { name: 'Arya Bima Sena', role: 'Member' },
  { name: 'Muhammad Faris Adjil Syamsudi', role: 'Member' },
  { name: 'Wisnu Jarodi', role: 'Member' },
  { name: 'Bimo Arya Daffa', role: 'Member' },
  { name: 'Sakti Attila Aulia Bintang', role: 'Member' },
  { name: 'Gregorry Fernando Kase', role: 'Member' },
  { name: 'Fawwaz Fatihul Ihsan', role: 'Member' },
  { name: 'Farrel Edviant Batubara', role: 'Member' },
  { name: 'Sabila Alya Nafisa', role: 'Member' },
];
