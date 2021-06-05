<p align="center">
    <a href="https://tij.me/"><img src="https://raw.githubusercontent.com/tijme/blog/master/themes/custom/source/tulip.svg" alt="Logo Blog Tijme" width="200" fill="white" /></a>
    <br/>
    <br/>
    <a href="https://github.com/tijme/blog/blob/master/LICENSE.md"><img src="https://raw.finnwea.com/shield/?firstText=License&secondText=MIT" /></a>
    <a href="https://github.com/tijme/blog/releases"><img src="https://raw.finnwea.com/vector-shields-v1/?typeKey=SemverVersion&typeValue1=tijme&typeValue2=blog&typeValue4=Stable"></a>
    <br/>
    <b>My blog about cyber security, hacking, software engineering and much more</b>
    <br/>
    <sup>Built by <a href="https://www.linkedin.com/in/tijme/">Tijme Gommers</a> – Buy me a coffee via <a href="https://www.paypal.me/tijmegommers">PayPal</a>
    <br/>
    <br/>
</p>

## Installation

Please make sure you're running [NodeJS](https://nodejs.org/en/) version 8 or higher. Then run these commands in the root of the project.

```
$ npm install -g grunt@1.3.0
$ npm install -g hexo-cli@3.1.0
$ npm install
$ cd themes/custom
$ npm install
$ grunt
```

## Publishing

The blog can be generated automatically by running the following command in the root of the project.

```
$ hexo generate --staging production
```

It can also be used with `--staging development` if you are generating the blog for development purposes. Please note that `grunt dev` in the `themes/custom` folder automatically (re)generates the content.

## Development

### Assets

If you will be updating assets you can use Grunt to automatically compile all assets and regenerate the content. Please make sure you have followed the installation steps before running the commands below.

```
$ cd themes/custom
$ grunt dev
```

## License

Tij.me (blog) is open-sourced software licensed under the [MIT License](https://github.com/tijme/blog/blob/master/LICENSE.md).
