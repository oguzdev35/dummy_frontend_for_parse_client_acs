# Dummy Client for testing purpose
Reactjs, webpack, babel, dotenv kullanarak browser'da renderlanan single page web applicationdır(SPA).

"Virtual Rooms" sekmesi ile access control için gerekli tetik mekanizması çalıştırılabilir. Herbir kapıya
ait giriş-çıkış log'ları bulunmaktadır.

"Administration" sekmesi ise test için gerekli personel ve kapı bilgilerinin eklenmesi, modifiye edilmesi,
silinmesi, listelenmesine olanak sağlar.

"Panel" sekmesi ise "web-socket" protokolü ile yapılmıştır. Database'te oluşan herhangi bir değişiklik 
backend serverdan test-clientine push edilir. Böylece Panel üzerindeki loglar sayfa yenilemeye gerek 
kalmadan güncelenebilir. 

# Nasıl Çalıştırılır?

.env dosyası sisteme uygun modifiye edilir. Daha sonra:

windowsta: yarn start-win
linuxta veya macosta: yarn start-nix