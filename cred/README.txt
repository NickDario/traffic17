Add your credentials here:

Quick certificate overview (for posterity) 

1. Setup
Generate an ssl key and use it to create a crt, files which will be referred to as:
<crt1>	//	the crt you've generated locally.
<key1>	//	the key you created locally and used to generate the above crt.
Use the internet to figure out how to do this if you don't know how. You should end up with a .crt and a .key file.

2. Signing
Find a certificate authority. There are several that will sign your certificate for free. They will authenticate your credentials are those registered to your hostname (In my case they sent an verification code to the email I had registed, though I had to make that email public first-blah). Afterwards they will give you a way to download your certificate. If the only option available is as a .pem file, you can extract the crt and key files from it. You should end up with
<crt2>	//	your certificate, after having been signed by the certificate authority, the goal of the whole signing process.
(key1)	//	this file is sometimes included in the ca's download.
You will also need your certificate authority's root certificate. This is a publicly available certificate that is their version of the certificate they just gave to you (only theirs is a lot more impressive). This app requires it in the pem format. You will need this so servers checking your certificate know who to check it with (basically, the real answer involves cryptographic hashes and is left as an excercise for the reader).
<ca-crt>//	Your certificate authority's certificate.

3. Using
This app requires the three files <crt1>, <key1> and <ca-crt> are placed in the /cred directory (not your root; the app root). In /src/config.ini specify these files in the [ssl] section. 

You should have somthing like this under your cred folder (extensions added for clarity).

/cred:
<crt1>.crt	//	the certificate given to you by your certificate authority (generated with your original key and crt which you have generated)
<ca-crt>.pem	//	the credentials of your certificate authority
<key1>.key	//	the key you were given when you generated




