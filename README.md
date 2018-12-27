# Release notes

## Tóm tắt
- Block chain là một công nghệ khá là được biết đến trong giai đoạn gần đây.
- Cơ bản thì block chain là hệ thống phi tập trung (decentralize) mà ở đó có một sổ cái chứa toàn bộ các giao dịch đã được thực hiện trước đó, các thành viên tham gia vào hệ thống phải tải số cái này về máy mình để đồng bộ hóa với toàn hệ thống. 
- Vì sổ cái này được chứa ở nhiều nơi, lưu ở nhiều máy nên việc sửa đổi nó là rất khó, và đó cũng chính là lý do mà blockchain được sử dụng (mình sẽ không đi sâu vào phần cấu trúc, tấn công, kiểm định và những thứ liên quan bên trong blockchain).
- Vì mang tính chất không thể sửa đổi nên các giao dịch liên quan đến tiền bạc, ngân hàng hay những thứ đòi hỏi sự tin tưởng rất thích hợp để dùng block chain, và để ứng dụng nó như một ví dụ, project này sẽ dùng blockchain làm nơi lưu trữ dữ liệu cho toàn bộ hệ thống, và ứng dụng sẽ là một mạng xã hội, với các user, các giao dịch chuyển tiền, đăng bài, comment, reaction, tạo tài khoản, theo dõi trang cá nhân của người khác. Hệ thông blockchain được thầy Đỗ Nguyên Kha xây dựng https://github.com/nguyenkha/forest.network và việc của project này là xây dựng hệ thống gồm:
  + Backend: Lưu trữ các giao dịch trên sổ cái của blockchain dưới một hình thức khác, có các bảng, các trường được tổ chức phù hợp với cấu trúc của transaction trên blockchain để phục vụ truy vấn nhanh hơn và đồng thời cung cấp các API cho client sử dụng những dữ liệu lưu trữ này. Backend phải kết nối realtime với blockchain để cập nhật và đồng bộ nếu có dữ liệu mới, việc kết nối này được hỗ trợ bởi thư viện Tendermint (bên dưới xài websocket). Backend còn phải hỗ trợ để client lấy dữ liệu realtime và có các thông báo đến client khi có sự kiện dữ liệu trên block bị thay đổi.
  + Frontend: Web app viết bằng reactjs là ứng dụng mạng xã hội với các chức năng như mô tả ở trên và sử dụng API do backend cung cấp để hiện thị và xử lý dữ liệu.
 - Dưới đây là chi tiết từng phần.

## Backend 
## Frontend









## Liệt kê lại những thứ chưa làm

- [ ] Realtime comment, react, transfer
- [ ] Recommend to follow (cái này cần có một tiêu chí gì đó)
- [ ] New feed
- [ ] Notification khi giao dịch thất bại


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
