# Tauri + Vue 3 + TypeScript

![](https://23img.com/i/2023/07/06/h20dgf.jpg)


# TODO:
1.软件自动更新
2.下载文件
3.其他页面的demo样式
4.暗黑亮白模式样式适配
5.多语言配置
6.


# 20230717：Done
1.资源分享页面按钮控制，
2.搜索Issue内容：并进行分页
3.资源分享页面分页展示





// Filehub根路径地址：用于存储文件和被Frok
export const fileHubBoss = "https://api.github.com/repos/Sjj1024/FileHub/forks"
// DataHub根路径：用于用户注册，分享内容，评论等
export const bossUrl = "https://api.github.com/repos/Sjj1024/DataHub/issues"
// 1024小神token：用于开发测试
export const bossToken = 'ghp_888grzs67MqxbZUH3wmIFKzecaKB0cTLy3ICBkl'.replace('888', '')
// 1024回家token：用于开发测试
export const guestToken = 'ghp_888LSkJC7DbB8pgMw6mynhQGLienoPv4P0pOLZ0'.replace('888', '')

export const publickKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2XeH3+CO9HeY9vJF9BCg
iw67gCJRn8Q3scvAF4cs1rtZfoQr3ixa227etQOjKnCW6pwCc3lbZgZlzsNEmNEH
DiBEH2ySEha79uFgm9ylXCW1DuHq+W0ST/iq3odJFB2va/C6OeAnywd0ZQK5wvFn
imRn6Ctm/WscS+i8DA7VqEun0mNFyqy5z3qiDDsBpLR92N8q6IAY42LFKPr9WAVI
M3iM0lUz6+siIAvMz6FnwWBNRKrF4sx1GputAeMF9/qQuaTVyq4ApltMGuUEttuD
7eSqBeXzitnwbb0fp070E6fIg+ur1ou4RjcRIW7xIRnGThiLdfelddk1aMZYFDOv
pQIDAQAB
-----END PUBLIC KEY-----`

export const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZd4ff4I70d5j2
8kX0EKCLDruAIlGfxDexy8AXhyzWu1l+hCveLFrbbt61A6MqcJbqnAJzeVtmBmXO
w0SY0QcOIEQfbJISFrv24WCb3KVcJbUO4er5bRJP+Kreh0kUHa9r8Lo54CfLB3Rl
ArnC8WeKZGfoK2b9axxL6LwMDtWoS6fSY0XKrLnPeqIMOwGktH3Y3yrogBjjYsUo
+v1YBUgzeIzSVTPr6yIgC8zPoWfBYE1EqsXizHUam60B4wX3+pC5pNXKrgCmW0wa
5QS224Pt5KoF5fOK2fBtvR+nTvQTp8iD66vWi7hGNxEhbvEhGcZOGIt196V12TVo
xlgUM6+lAgMBAAECggEAQyVkp0wzZ6l76hfxYIQ3xegFHfG6yT1xQu0aAUnEHwNX
BTjzQJTqcuGfUz3txf9goc0M9rGsdmqYScjCJ/s2lfaBgkBoM7ygSgDZ7xYoWrTr
3E4GWwCCDH5H6BDWkCcAULBSF+et8cL5/exjBh26riEFckrgcHP/lzKjyYdVEjLE
R2RUiPOZPf6qrC7aQZGJP/35oC5R0BsBs+0h8am1h5k6V5arsDORL9JrgUy0DHtV
cxInEaYso8RksC0UWwjm+PFPV3rrPOxvdGyoM9t/Th9H2Gj39IUTUVIzuQbRaF63
Ei4fPLDU11vphgo1ad+fc79c9rwP1QEgYEoPG8p0SwKBgQDtfyCyCevYBKDRIwlJ
UFScJS0VB2IN46N3ntZ9bOVBBFJg7GSCw2/7P9LDBw1TI9czTENTJl2H8HXY8ZUt
Xg5TDINZET0bqxKtbGMZX7k57X5yGikzjYgGwND+aebeBDqY0OJN3s9dMPZb0Z/B
AoXfYa3LrtI5X2bN8K32khCvjwKBgQDqaOky0s+kr8w6Cvwcr1aNxk1urmtFcp72
g5XI9jfXWMLsw/p0gryT/hCz3HnTQf6BAGX0HuZJB+an753jh8JNerm7g50mvl+B
0fKtJc+1F08pjzw8c1dRHJSFWDhN1hco+Gf1u1051wtfez5kIhTk6eOdS9lQEJcJ
aOVV07dTiwKBgD2icGnECWDWUqXz4cUVA+BCBaEfeWMBYLr6jc+fIx/sbzSYJL2K
2tTpi1jxy5N4CbFWaWJ64msVDIBwsbZEYpNK/AtxXdqAWyiGqHE9VmSiLd6Oy4KF
iHe4MoTUFwYnMs3V5+UtncMhoc3SaRM+BGAkiWYCyKv7BkML4xnKbmohAoGAR2Gd
KdniW18hTMeNkFqge9nYOI0qo2JNH/pgAWthA9XGvfzL5vDs5hAnG+5WtstQ6g2p
/lXugGzEg31HUkNEGv31UzG4CFVOliTNxoZOIvIvLBOvHyVsgIm4fIap1qIMOXCz
j7P3pqZikzfffvSV8kN7CapQSb5TkAz+UU2AdRMCgYA48ZbZsYymzBrMmsXD63ky
Or7ARZ1oKZFUSGbO8QOSBZ4x6OCZfqC2kcS9aodag1Djgwjol+wgrIKpUOGdokqi
J5RnZRA2N8jbc7wSJ1EwqXkWUBpryJKC0x4JOdWWGwWAjQz1OtfFhzMOsZ3VvRYN
KNy/tna1P4SSB0V9v2BsYw==
-----END PRIVATE KEY-----`