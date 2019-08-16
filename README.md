<p align="center">
    <a href="https://finnwea.com/"><img src="https://raw.githubusercontent.com/tijme/blog/master/themes/custom/source/favicon.png" alt="Logo Blog Tijme" /></a>
    <br/>
    <br/>
    <a href="https://github.com/tijme/blog/blob/master/LICENSE.md"><img src="https://raw.finnwea.com/shield/?firstText=License&secondText=MIT" /></a>
    <a href="https://github.com/tijme/blog/releases"><img src="https://raw.finnwea.com/shield/?typeKey=SemverVersion&typeValue1=blog&typeValue2=master&typeValue4=Stable"></a>
    <br/>
    <b>My blog about cyber security, hacking, software engineering and much more</b>
    <br/>
    <sub>Donate via <a href="https://www.paypal.me/tijmegommers/5">PayPal</a> – Built with ❤︎ by <a href="https://twitter.com/finnwea">Tijme Gommers</a></sub>
    <br/>
    <br/>
</p>

## Installation

Please make sure you're running [NodeJS](https://nodejs.org/en/) version 8 or higher. Then run these commands in the root of the project.

```
$ npm install -g grunt
$ npm install -g hexo-cli
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
