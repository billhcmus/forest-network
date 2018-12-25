﻿# Release notes

## Liệt kê lại những thứ chưa làm

- [ ] Realtime comment, react, transfer
- [ ] Recommend to follow (cái này cần có một tiêu chí gì đó)
- [ ] New feed
- [ ] Notification khi giao dịch thất bại

## Bug cần sửa
- Chuyển đổi giữa các tab tweet, following , follower
- Chuyển đổi giữa trang cá nhân khác nhau
## Cần làm
- Hiển thị ngày trên bài post, đã có lưu trong sync(Nhớ xóa chạy lại DB)
- Tăng tốc độ chạy DB lần đầu
- Xem danh sách các transaction
- Hiển thị bài đăng của những người mình follow trên newfeed


## Front-end
- Mục đích là dùng css thay vì import scss
- Yêu cầu: cài sass
- Chạy command sau:

```sh
Command có thể khác trên window :)
cd src/scss
sass --watch navstyle.scss
sass --watch app.scss
```

### Back-end

- Khởi động service của mogod như sau:

```sh
sudo service mongod start
```

- Dùng robo3t để theo dõi trực quan hơn.

- Chạy server:

```sh
npm run dev
or
npm start
```

- Test demo api

```sh
http://localhost:3001/api/users
```

- Tien:
  - Secret key: SAN4YZ62PPL5YPWZVYFEN3D3MM64FHUVN536NCIOBZE6YUCGHWZXL5QB
  - Public key: GBE57A6BQ3ETJGERFZFC5G6AQACCRJXQK6BRWJ254AGRHCNN2ANXQICL
  - Secret key (base64): G8xn2nvX3D7ZrgpG7HtjPcKelW935okODknsUEY9s3VJ34PBhsk0mJEuSi6bwIAEKKbwV4MbJ13gDROJrdAbeA==
  - Public key (base64): Sd+DwYbJNJiRLkoum8CABCim8FeDGydd4A0Tia3QG3g=
  - Tenermint address: 5DA9D15010FED278E24FCAB379386F711CDA8C0E
  
- Thong:
  - Secret key: SBPESDLGQCJ2FK63GEXULOBCABLSKW4MK6X7O2463DIMH2FX6AFPPFPS
  - Public key: GADQGUVQECTOA5MF53XANG6QHNP7VPSPHET4AVHGDQOVXAF3XQVSWNH4
  - Secret key (base64): XkkNZoCToqvbMS9FuCIAVyVbjFev92ue2NDD6LfwCvcHA1KwIKbgdYXu7gab0Dtf+r5POSfAVOYcHVuAu7wrKw==
  - Public key (base64): BwNSsCCm4HWF7u4Gm9A7X/q+TzknwFTmHB1bgLu8Kys=
  - Tenermint address: E2E2FA675848740AEC1E6FCA0D01F871AD1F3695

- Thuyen:
  - Secret key: SDHUCXZ7D5B7QWJQTOGJLC4R72RUCBJI5G6ZEOGQIZOJR4AZBP7XHFUH
  - Public key: GDO6ZIAAXNHC6QZNIELH3TO3N4DITTUWLMOBMFON236WYM7PQN2QC2B3
