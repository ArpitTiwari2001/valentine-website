# Valentine Website

A valentine website for your bae. <br>
This project gives you a template to use and edit for your valentine website instead of building one from scratch <br>

Edit the *'script.js'* file to customize the message.

## 

This project is based on [in-all-the-stars](https://github.com/KalDrongo/in-all-the-stars), created by [KalDrongo](https://github.com/KalDrongo). 

*Features added:*

- background stars blinking
- cursor change
- mobile responsiveness
- simple button reveal (works on static hosting)
- text glow effect

## ⚒️ Languages / Library
- HTML
- CSS
- Javascript
- PHP
- [PHPMailer](https://github.com/PHPMailer/PHPMailer)


## 💻 Demo

Check out the demo website: [Valentine-website](https://sojijr.github.io/valentine-website/)

## How to use
Click [`Use this template`](https://github.com/sojijr/valentine-website/generate) and it will create a new repo not a fork with all the files of this project for you.

![image](https://user-images.githubusercontent.com/78784850/198232353-35fa6d2f-5816-4818-9381-a5bf394b146a.png)

## Prerequisites to use 👇🏽
- [Composer](https://getcomposer.org/) - to use
before installation, please make sure you have it already installed.

## 🛠️ Installation Steps (Local)

1. After generating a new repo using this template, clone the project, you can use the following command:

```bash
git clone https://github.com/<your-github-username>/valentine-website
```

2. Move the cloned repository to Xampp/htdocs or wamp64/www <br>

3. Navigate to the project directory

```bash
cd Xampp/htdocs/valentine-website or wamp64/www/valentine-website
```

4. Install dependencies with composer install (only needed if you use PHP mail)

```bash
composer install
```

5. Run the project by entering the URL below on your browser to run it

```bash
http://localhost/valentine-website/
```

## ✅ Hosting (Always On)
This project is static and can be hosted on GitHub Pages so the link works even when your laptop is off.

1. Push the repo to GitHub.
2. In GitHub, go to `Settings` → `Pages`.
3. Under “Build and deployment”, choose `Deploy from a branch`.
4. Select `main` branch and `/ (root)`, then click Save.
5. Wait 1-2 minutes. GitHub will show your live URL at the top of the Pages settings.

If you want a custom domain, add it in the same Pages screen and update your DNS records.

## ✉️ EmailJS Setup (Optional, No Server)
1. Create a free EmailJS account.
2. Add an Email Service (Gmail works).
3. Create a Template with variables: `to_name`, `from_name`, `message`, `to_email`.
4. Copy your `Public Key`, `Service ID`, and `Template ID`.
5. Update `script.js` with those values and her email.

## 👩🏽‍💻 Contributing

Any contributions you make are greatly appreciated.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏🏽 Support

This project needs a star️ from you. Don't forget to star it✨
