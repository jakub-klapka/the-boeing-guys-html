
#The Boeing Guys dokumentace

[TOC]

##Struktura stránek

Stránky používají tzv. "Hezké URL adresy" (takže URL adresa pro stránku pak je třeba: http://www.theboeingguys.cz/cockpit/). Aby toto fungovalo, tak je potřeba dodržovat strukturu stránek a podstránek.

Všechny obsahové stránky jsou ve složce `pages` ve formátu `.yaml`. Struktura té složky přesně kopíruje strukturu URL adres, takže pokud budu mít soubor `pages/fotogalerie/overhead.yaml` tak URL adresa pro tento soubor bude http://www.theboeingguys.cz/fotogalerie/overhead. Takto se dá vytvářet neomezený počet stránek a můžou na sebe vzájemně odkazovat atd.

###Hlavní menu

Stránky, co budou viditelné v hlavním menu se upravují v souboru `index,php`, kde je kousek od vrchu souboru:
```php
$menu = array(
	'index',
	'cockpit',
	'systemy',
	'postupy',
	'videa',
	'737-ng',
	'ke-stazeni'
); //add page names visible in main menu
```
Sem se dají přidávat a ubírat stránky v hlavním menu. Jako popisek tlačítka v menu je použit atribut `title` dané stránky (více později).
Názvy stránek v této proměnné musí být totožné se jménem souboru v složce `pages/`.

##Formát stránky

Všechny stránky jsou ve formátu YAML FrontMatter. Nejde o nic složitého, stránky mají pouze příponu `.yaml` a jde v podstatě o naprosto obyčejné HTML soubory, které pouze mají ve vrchní části metadata stránky.

Soubor vždy začíná metadaty, které jsou od HTML části zvrchu i zespod odděleny třemi čárkami. Po této části se už píše standardní HTML kód.

```html
---
title: Home
seo_description: Tenhle popis bude ukazovat google...
fb_description: Toto bude vidět při sdílení stránky na facebooku
fb_image: images/logo.svg
has_slider: true
has_yt_gallery: true
---
<h1>Zde už je standardní HTML kód</h1>
<p>Texty text....<p>
```

###Metadata stránky

Metadata, který tento web podporuje jsou:

Atribut  | Popis
-|-
**`title`** | Zobrazuje se v záhlaví stránky, ukazuje se také jako nadpis stránky ve vyhledávačích. Doporučuji uvádět pro každou stránku
**`seo_description`** | Tento popis se ukazuje ve vyhledávačích jako popis stránky. Sice není na samotné stránce vidět, ale hodně to pomáhá právě pro SEO. Sice asi neovlivňuje pořadí ve vyhledávači, ale zásadně ovlivňuje to, jestli na ten odkaz člověk klikne. Mělo by to být tedy krátké shrnutí konkrétní stránky, aby to člověka nalákalo.
**`fb_description`** | Toto je zase popis, který se ukáže, když člověk sdílí stránku na Facebooku.
**`fb_image`** | Obrázek, který se ukáže, při sdílení na FB. Jde o relativní cestu z kořene webu.
**`has_slider`** | Toto je třeba nastavit pouze u těch stránek, které obsahují slider. Zařídí to načtení skriptů, které se starají o slider a které je zbytečné načítat na všech stránkách... Pokud na stránce slider není, tak tento atribut vůbec neuvádět!
**`has_yt_gallery`** | Podobně jako u slideru je toto třeba nastavit na `true` tam, kde je videogalerie.


##Obsah stránek

Obsah stránek už se píše standardním HTML kódem, ale je tam nachystáno plno bloků, které můžeš používat jak je libo.

### Odkazy

Aby správně fungovaly URL adresy na všech podstránkách, je třeba dělat odkazy na stránky a obrázky trochu netradičně. Nejde o nic složitého, jen je vždy na začátek odkazu nutné dát tag `[root_path]/`. Ten bude vždy nahrazen tak, aby odkaz směřoval správně nehledě na to, na jaké stránce právě člověk je.

*V praxi to vypadá takto:*
```html
<a href="[root_path]/fotogalerie/overhead">Odkaz na fotogalerii Overheadu</a>
<img src="http:[root_path]/fotky/foto1.jpg" alt="Alt" width="415" height="126"/>
```

### Typografie

Na stránkách můžeš (vlastně bys měl) používat tyto HTML typografické prvky

Tag | Popis
- | -
`<p>` | Všechen volný text by vždy měl být uzavřen v odstavci! Jednak to pomáhá sémantice a také to zajistí správné rozestupy mezi prvky.
`<h1><h2><h3><h4>` | Nadpisy je také výhodné používat. Dobře to vizuálně odděluje sekce a hodně to napomáhá pro SEO.
`<p class="metadata">` | Odstavec s touto třídou bude trochu menší a je to vymyšlené hlavně pro zobrazení datumu článku.
`<blockquote>` | Bloková citace udělá obsah velmi výrazný. Hodí se to pro zvýraznění nějakého faktu atd. Nezapomínej, že i v blokové citaci by text měl být v odstavci `<p>`.
`<ul><ol>` | Číslované a nečíslované listy, které jsou také upraveny aby vizuálně ladily s webem. Jde dělat i podlisty viz. příklad.
`<hr>` | Horizontální oddělovač
`<a class="download_link">` | Odkaz pro stažení souboru - bude mu přidána ikonka a bude vystředěn. Viz. příklad.

*Příklad listu s podlistem:*
```html
<ul>
	<li>Lorem ipsum.</li>
	<li>Adipisci, tenetur?</li>
	<li>Inventore, laudantium.</li>
	<li>Fuga, omnis?
		<ul>
			<li>Lorem.</li>
			<li>Architecto.</li>
			<li>Nemo?</li>
		</ul>
	</li>
	<li>Lorem ipsum.
		<ol>
			<li>Lorem.</li>
			<li>Quasi!</li>
			<li>Necessitatibus!</li>
		</ol>
	</li>
	<li>Magnam, nam.</li>
</ul>
```

*Příklad odkazu pro stažení*
```html
<a class="download_link" href="">Stáhnout "soubor.pdf" (40,2MB)</a>
```

### Panel

V podstatě vše na stránce by mělo vždy být alespoň v jednom panelu, jinak to nebude vypadat správně. Jde spíš o to, že někdy se ti může hodit mít panelů na jedné stránce víc.

```html
<!-- PANEL -->
<article class="main_content panel">
	Cokoliv zde bude uzavřeno v panelu.
</article>
<!-- /PANEL -->
```

### Submenu

Na každé stránce se dá udělat submenu s odkazy na další stránky. Teoreticky to jde kdekoliv, ale dobře to vypadá asi jen vždy na začátku panelu. Submenu musí vždy být v panelu!

```html
<!-- SUBMENU -->
<nav class="submenu">
	<ul class="submenu__menu">
		<li class="submenu__menu__item button">
			<a href="[root_path]/fotogalerie/overhead">Kategorie 1</a>
		</li>
		<li class="submenu__menu__item button">
			<a href="[root_path]/fotogalerie/pedestal">Kategorie 2</a>
		</li>
	</ul>
</nav>
<!-- /SUBMENU -->
```

### Sloupce

Na stránce můžeš používat rozdělení do dvou nebo tří sloupců. Do sloupců pak můžeš dávat jakýkoliv jiný obsah dle libosti...

```html
<div class="two_columns">
	<div class="two_columns__column">

		<p>Obsah prvního sloupce</p>

	</div>
	<div class="two_columns__column">

		<p>Obsah druhého sloupce</p>

	</div>
</div>
```

```html
<div class="three_columns">
	<div class="three_columns__column">

		<p>Obsah prvního sloupce</p>

	</div>
	<div class="three_columns__column">

		<p>Obsah druhého sloupce</p>

	</div>
	<div class="three_columns__column">

		<p>Obsah třetího sloupce</p>

	</div>
</div>
```

### Obrázky

#### Velikosti obrázků

Protože na pozadí není žádný redakční systém, tak si budeš muset obrázky zmenšovat ručně. Šířku obrázků je potřeba dodržet, aby to sedělo do designu. Výška obrázků je doporučená tak, aby byl zachován vertikální rytmus toho obsahu (typografická záležitost), ale není to nutné dodržovat, aby to fungovalo. Samozřejmě pokud máš víc obrázků vedle sebe, tak to chce mít u nich stejnou výšku, jinak to nebude vypadat dobře

Obrázek | Šířka (px) | Doporučená výška (px)
- | :-: | :-:
Obrázek přes celou stránku | 826 | násobky 124
Obrázky ve dvou sloupcích | 415 | násobky 124
Obrázky ve třech sloupcích | 265 | násobky 124
Fotogalerie | 196 | násobky 124
Slider | 960 | 402

#### Jednoduchý obrázek

Jednoduchý obrázek bez ničeho kolem by stejně vždy měl být v odstavci `<p>`:
```html
<p><img src="http://lorempixel.com/415/124/transport" alt="Alternativní popis obrázku" width="415" height="126"/></p>
```
Je dobré do img tagu uvádět i alternativní popis (hlavně pro vyhledávače) a také rozměry (ty zase zlepšují načítání stránky).

#### Obrázek s popiskem

Obrázek s popiskem by naopak neměl být v odstavci `<p>`. Sémantika je právě zde nahrazena tagem `figure`.

```html
<figure>
	<img src="http://lorempixel.com/415/124/transport/2" alt="Obrázek" width="415" height="124"/>
	<figcaption>Popis obrázku</figcaption>
</figure>
```

#### Obrázky v Lightboxu

Jakýkoliv obrázek jde udělat tak, že po rozkliknutí se ukáže jeho velká verze v "Lightboxu". Celý obrázek je nutné dát do odkazu `<a>`, který bude mít `class="image_link"` a také atribut `data-lightbox="galerie1"`. Atribut `href=` pak musí odkazovat na velkou variantu obrázku. Obsah atributu data-lighbox umožňuje dělat z obrázků galerii. Jinak řečeno všechny obrázky na stránce, které mají stejný data-lighbox bude možné v lighboxu procházet postupně šipkamni nebo klikáním na obrázek (nebo posouváním na dotykových obrazovkách).

*Příklad jednoduchého obrázku*
```html
<p>
	<a href="http://lorempixel.com/800/600/transport/1" class="image_link" data-lightbox="galerie1">
		<img src="http://lorempixel.com/415/124/transport/1" alt="Alt" width="415" height="126"/>
	</a>
</p>
```

*Příklad obrázku s popiskem*
```html
<figure>
	<a href="http://lorempixel.com/800/600/transport/2" class="image_link" data-lightbox="galerie1">
		<img src="http://lorempixel.com/415/124/transport/2" alt="Obrázek" width="415" height="124"/>
	</a>
	<figcaption>Popis obrázku</figcaption>
</figure>
```

> **Poznámka**: Pokud chceš mít obrázky vedle sebe ve sloupcích, použij normálně HTML kód pro sloupce (viz. výše) kde do každého sloupce dej obrázek.

#### Galerie obrázků

Galerie automaticky dá obrázky do 4 sloupců a je možné v ní udělat odkaz třeba na kompletní galerii (na jinou stránku).

```html
<div class="image_gallery">
	<a href="http://lorempixel.com/500/600/transport/7" class="image_link">
		<img src="http://lorempixel.com/196/124/transport/7" alt=""/>
	</a>
	<a href="http://lorempixel.com/500/600/transport/8" class="image_link">
		<img src="http://lorempixel.com/196/124/transport/8" alt=""/>
	</a>
	<a href="http://lorempixel.com/500/600/transport/9" class="image_link">
		<img src="http://lorempixel.com/196/124/transport/9" alt=""/>
	</a>
	<a class="image_gallery__link" href="">Kompletní fotogalerie</a>
</div>
```

### Slider

Slider je možné vložit na jakoukoliv stránku místo panelu. Tj. slider nikdy nesmí být v panelu! (asi jako jediná věc).

```html
<!-- SLIDER -->
<section class="slider" data-slider data-slider-timeout="5">
	<img src="http://lorempixel.com/960/400/transport/1" alt="" width="960" height="400" class="slider__image"/>
	<span data-src="http://lorempixel.com/960/400/transport/2" data-alt="" data-width="960" data-height="400" class="slider__image_placeholder"></span>
	<span data-src="http://lorempixel.com/960/400/transport/3" data-alt="" data-width="960" data-height="400" class="slider__image_placeholder"></span>
	<span data-src="http://lorempixel.com/960/400/transport/4" data-alt="" data-width="960" data-height="400" class="slider__image_placeholder"></span>
	<span data-src="http://lorempixel.com/960/400/transport/5" data-alt="" data-width="960" data-height="400" class="slider__image_placeholder"></span>
	<span data-src="http://lorempixel.com/960/400/transport/6" data-alt="" data-width="960" data-height="400" class="slider__image_placeholder"></span>
	<span data-src="http://lorempixel.com/960/400/transport/7" data-alt="" data-width="960" data-height="400" class="slider__image_placeholder"></span>

	<div class="slider__controls">
		<button class="slider__controls__knob"></button>
	</div>
</section>
<!-- /SLIDER -->
```

Všimni si také, že první obrázek je jako `<img>` a všechny zbylé jako `<span>`. To je kvůli rychlému načítání a ani to není pro tebe moc důležité, v podstatě si jen uprav cesty k obrázkům a je to.

Dál nezapomeň na atribut `has_slider` u stránky, kde máš slider, jinak nebude fungovat!

> **Tip:** Upravením `data-slider-timeout="5"` můžeš měnit, jak často (v sekundách) se bude slider posouvat.

### Seznam článků

Také můžeš používat předdefinovaný styl pro seznam článků. Nejlepší je to použít zároveň se sloupci, jak je to na ukázkových stránkách.

```html
<p><a href="" class="image_link article_summary_image"><img src="http://lorempixel.com/415/124/transport/1" alt="Obrázek"/></a></p>
<h2 class="article_summary_heading"><a href="">Nadpis článku</a></h2>
<time datetime="2014-01-01" class="article_summary_date">1. ledna 2014</time>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
	<a href="" class="article_summary_more_link">Pokračovat ve čtení...</a>
</p>
```

Není problém třeba vynechat obrázek nebo odkaz na další čtení. Čas v atributu `datetime=` by měl být přesně v tomto formátu a slouží vyhledávačům. V samotném textu už můžeš datum psát v jakékoliv podobě a vyhledávač stejně bude vědět, co jsi tím myslel.

Dál jsou nastylované ještě odkazy pro přecházení mezi stránkami:
```html
<!-- NAVIGACE V CLANKU -->
<div class="article_navigation">
	<a class="article_navigation__left" href="">Předchozí články</a>
	<a class="article_navigation__right" href="">Následující články</a>
</div>
<!-- /NAVIGACE V CLANKU -->
```

### Videogalerie

Videogalerie je víceméně automatická, stačí zadat správný HTML kód a stránka už si sama načte první video do velkého okna a připraví vše potřebné na přepínaní videa, mělo by to být docela inteligentní :) Důležité je jen vyplnit správné odkazy na YouTube.

Nezapomeň také na [atribut `has_yt_gallery`](#typografie) !

```html
<!-- VIDEOGALERIE -->
<div class="youtube_gallery" id="youtube_gallery">
	<figure class="youtube_gallery__thumbnail">
		<a href="https://www.youtube.com/watch?v=CwmnNoiSLzs&list=UUbbVAtyywkQscZc76qc8L5Q"></a>
		<figcaption>
			<h3 class="youtube_gallery__thumbnail__heading">Název videa</h3>
			<p>Popis videa</p>
		</figcaption>
	</figure>

	<figure class="youtube_gallery__thumbnail">
		<a href="https://www.youtube.com/watch?v=GyRvb6Hfzi8&list=UUbbVAtyywkQscZc76qc8L5Q"></a>
		<figcaption>
			<h3 class="youtube_gallery__thumbnail__heading">Název videa bez popisu</h3>
		</figcaption>
	</figure>

	<figure class="youtube_gallery__thumbnail">
		<a href="https://www.youtube.com/watch?v=U8ICo18jFfo&list=UUbbVAtyywkQscZc76qc8L5Q"></a>
		<figcaption>
			<h3 class="youtube_gallery__thumbnail__heading">Název videa</h3>
		</figcaption>
	</figure>
</div>
<!-- /VIDEOGALERIE -->
```
