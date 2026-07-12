# Kostify - System Design & Architecture

Dokumentasi ini menjelaskan secara mendalam tentang perancangan sistem, arsitektur basis data (ERD), alur proses (Sequence Diagram), dan endpoint API pada ekosistem **Kostify**.

## 📊 Entity Relationship Diagram (ERD)

Berikut adalah struktur basis data relasional PostgreSQL yang dirancang menggunakan model relasi 1-to-1 untuk pemisahan data profil pengguna agar database tetap optimal dan bersih.

```mermaid
erDiagram
    User ||--o| TenantProfile : "has 1-to-1"
    User ||--o| OwnerProfile : "has 1-to-1"
    User ||--o{ Booking : "makes"
    User ||--o{ Payment : "pays"
    
    OwnerProfile ||--o{ Kost : "owns"
    Kost ||--o{ Room : "contains"
    Room ||--o{ Booking : "has"
    Booking ||--o{ Payment : "linked to"

    User {
        string id PK
        string email UK
        string password
        string name
        enum role "SUPER_ADMIN | OWNER | TENANT"
        string phone
        datetime createdAt
        datetime updatedAt
    }

    TenantProfile {
        string id PK
        string userId FK "Unique"
        enum gender "LAKI_LAKI | PEREMPUAN"
        string ktpNumber
        string occupation
        string emergencyPhone
        datetime createdAt
        datetime updatedAt
    }

    OwnerProfile {
        string id PK
        string userId FK "Unique"
        string bankName
        string bankAccount
        string bankOwnerName
        boolean isVerified
        datetime createdAt
        datetime updatedAt
    }

    Kost {
        string id PK
        string name
        string description
        string address
        string city
        float latitude
        float longitude
        string[] rules
        string[] facilities
        string ownerId FK
        datetime createdAt
        datetime updatedAt
    }

    Room {
        string id PK
        string kostId FK
        string roomNumber
        float price
        boolean isAvailable
        string[] facilities
        datetime createdAt
        datetime updatedAt
    }

    Booking {
        string id PK
        string tenantId FK
        string roomId FK
        datetime startDate
        datetime endDate
        enum status "PENDING | APPROVED | REJECTED"
        datetime createdAt
        datetime updatedAt
    }

    Payment {
        string id PK
        string bookingId FK
        string tenantId FK
        float amount
        enum status "PENDING | SUCCESS | FAILED"
        string paymentMethod
        string snapToken
        datetime createdAt
        datetime updatedAt
    }
```

---

## 🔄 Sequence Diagrams

### 1. Alur Registrasi Akun & Pembuatan Profil
Menjelaskan bagaimana pengguna mendaftar ke sistem, divalidasi oleh backend, dan profil khusus dibuat berdasarkan role mereka (Owner/Tenant).

```mermaid
sequenceDiagram
    autonumber
    actor Client as User/Client
    participant API as NestJS API
    participant DB as PostgreSQL (via Prisma)

    Client->>API: POST /auth/register (name, email, password, role)
    Note over API: Validasi format data & enkripsi password (bcrypt)
    
    API->>DB: Cek ketersediaan Email
    DB-->>API: Email Belum Terdaftar
    
    API->>DB: Simpan data User baru
    DB-->>API: User Berhasil Disimpan
    
    rect rgb(30, 41, 59)
        Note over API: Jika role = OWNER, buat profil kosong di OwnerProfile
        API->>DB: INSERT INTO OwnerProfile (userId)
        DB-->>API: OwnerProfile Created
    end
    
    API->>API: Generate JWT Token (payload: userId, email, role)
    API-->>Client: HTTP 201 (access_token, user_data)
```

### 2. Alur Transaksi Pemesanan Kamar (Booking & Payment)
Menjelaskan proses penyewa melakukan booking kamar hingga pembayaran berhasil diproses menggunakan Payment Gateway (Midtrans).

```mermaid
sequenceDiagram
    autonumber
    actor Tenant as Penyewa (Mobile)
    actor Owner as Pemilik Kost (Web)
    participant API as NestJS API
    participant Gateway as Midtrans PG
    participant DB as PostgreSQL

    Tenant->>API: POST /bookings (roomId, startDate)
    API->>DB: INSERT INTO Booking (status: PENDING)
    DB-->>API: Booking Created
    API-->>Tenant: Booking Sukses (Menunggu Persetujuan Owner)

    Owner->>API: PATCH /bookings/:id (status: APPROVED)
    API->>DB: UPDATE Booking set status = APPROVED
    DB-->>API: Updated

    Note over API: Otomatis buat invoice pembayaran setelah di-approve
    API->>DB: INSERT INTO Payment (status: PENDING)
    
    API->>Gateway: Request Snap Token (amount, bookingId)
    Gateway-->>API: Return snapToken
    API->>DB: Update Payment dengan snapToken
    API-->>Tenant: Notifikasi Tagihan Siap Dibayar

    Tenant->>Gateway: Bayar via Snap SDK (Virtual Account/E-Wallet)
    Gateway-->>Tenant: Pembayaran Sukses
    
    Note over Gateway: Webhook Notification sent to API
    Gateway->>API: POST /payments/webhook (transaction_status: settlement)
    API->>DB: UPDATE Payment status = SUCCESS
    API->>DB: UPDATE Room status isAvailable = false
    API-->>Tenant: Notifikasi: Kamar Siap Ditempati!
```

---

## 🛠️ Dokumentasi API Utama (Endpoints)

### **Autentikasi (`/auth`)**
- `POST /auth/register`: Mendaftarkan akun user baru (Role default: `TENANT`).
- `POST /auth/login`: Autentikasi user & generate JWT Token.
- `GET /auth/me`: Mengambil data profil user saat ini (Membutuhkan Header Bearer Token).

### **Kost & Kamar (`/kosts`, `/rooms`)**
- `GET /kosts`: Mencari dan memfilter kost (Mobile/Web).
- `POST /kosts`: Membuat properti kost baru (Khusus Owner).
- `GET /kosts/:id`: Melihat detail unit kost beserta daftar kamarnya.
- `POST /rooms`: Menambahkan kamar baru ke dalam kost (Khusus Owner).

### **Transaksi (`/bookings`, `/payments`)**
- `POST /bookings`: Mengajukan sewa kamar kost (Khusus Tenant).
- `GET /bookings/owner`: Melihat daftar pengajuan sewa masuk (Khusus Owner).
- `PATCH /bookings/:id`: Menyetujui/menolak pengajuan sewa (Khusus Owner).
- `POST /payments/webhook`: Menerima callback status pembayaran dari Midtrans.
