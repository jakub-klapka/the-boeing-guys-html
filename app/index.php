<?php
/*
  * TBG Loader
  */
include_once( 'inc/frontmatter.php' );

// -------- CONFIG -----------
$root_path = '/theboeingguys/app'; //leave blank for root domain
$css_js_ver = 1; //bump by one on every change of css or js files
$menu = array(
	'index',
	'cockpit',
	'systemy',
	'postupy',
	'videa',
	'737-ng',
	'ke-stazeni'
); //add page names visible in main menu
// ---------------------------

$uri = $_SERVER['REQUEST_URI'];
$uri = str_replace( $root_path, '', $uri );
if( $uri === '/' ) {
	//Home
	$file = 'pages/index.yaml';
} else {
	$filename = 'pages' . $uri . '.yaml';
	if( file_exists( $filename ) ) {
		$file = $filename;
	} else {
		header("HTTP/1.0 404 Not Found");
		$file = 'pages/404.yaml';
	}
}
$content = new FrontMatter( $file );

function get_root_url() {
	global $root_path;
	return 'http' . ( ( !empty( $_SERVER['HTTPS'] ) ) ? 's' : '' ) . '://' . $_SERVER['SERVER_NAME'] . $root_path;
}

?>
<!doctype html>
<html lang="cs-CZ">
<head>
	<meta charset="UTF-8">
	<title><?php if( $content->keyExists( 'title' ) ) : ?><?= $content->fetch('title'); ?> | <?php endif; ?>The Boeing Guys</title>

	<link href='//fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic,300,300italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="<?= $root_path; ?>/css/layout.css?v=<?= $css_js_ver; ?>"/>

	<!-- GOOGLE METADATA-->
	<?php if( $content->keyExists( 'seo_description' ) ) : ?>
		<meta name="description" content="<?= $content->fetch( 'seo_description' ); ?>">
	<?php endif; ?>
	<meta name="robots" content="index, follow">

	<!-- FACEBOOK METADATA -->
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="cs_CZ" />
	<?php if( $content->keyExists( 'fb_image' ) ) : ?>
		<meta property="og:image" content="<?= get_root_url() . '/' . $content->fetch( 'fb_image' ); ?>" />
	<?php endif; ?>
	<?php if( $content->keyExists( 'fb_description' ) ) : ?>
		<meta property="og:description" content="<?= $content->fetch( 'fb_description' ); ?>" />
	<?php endif; ?>

</head>
<body>

<div class="speedtape"><div class="speedtape__indicator" id="speedtape_indicator" data-range-bottom="40" data-range-top="340"></div></div>
<div class="altimeter"><div class="altimeter__indicator" id="altimeter_indicator" data-range-bottom="0" data-range-top="41000"></div></div>

<div class="container">

	<header class="main_header">

		<section class="panel main_header__logo">
			<a class="main_header__logo__link" href="<?= get_root_url(); ?>">
				<img src="<?= $root_path; ?>/images/logo.svg" alt="The Boeing Guys logo" width="200" height="100"/>
			</a>
		</section>

		<nav class="panel main_header__nav">
			<ul class="main_header__nav__menu">
				<?php foreach( $menu as $item ) : ?>
					<?php $menu_item = new FrontMatter( 'pages/' . $item . '.yaml' ); ?>
					<li class="main_header__nav__menu__item"><a href="<?= $root_path; ?>/<?= $item; ?>"><?= $menu_item->fetch( 'title' ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</nav>

	</header>

	<?php echo str_replace( '[root_path]', $root_path, $content->fetch( 'content' ) ); ?>

	<footer class="main_footer panel">
		&copy; 2014 Boeing 737 NG Simulator website. Všechna práva vyhrazena.
		<div class="main_footer__made_by">Design and code by <a href="http://www.lumiart.cz" target="_blank">Lumiart.cz</a></div>
	</footer>

</div>

<script type="text/javascript" src="<?= $root_path; ?>/js/layout.js"></script>

<?php if( $content->keyExists( 'has_slider' ) ) : ?>
	<script type="text/javascript" src="<?= $root_path; ?>/js/slider.js"></script>
<?php endif; ?>

<?php if( $content->keyExists( 'has_yt_gallery' ) ) : ?>
	<script type="text/javascript" src="<?= $root_path; ?>/js/youtube_gallery.js"></script>
<?php endif; ?>
</body>
</html>