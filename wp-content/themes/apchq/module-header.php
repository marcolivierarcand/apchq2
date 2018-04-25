<div class="Header-nav col-12 p-sm align-c grid">
	<div class="col-4">
		<img class="logo" src="<?php echo get_field('header_logo')['url'];?>" alt="logo de l'entreprise">
	</div>

	<div class="justify-r grid col-8 m--xsm-t-sm">
		<a href="tel:+1-<?php the_field('header_phone') ?>" class="button outline m-r-xsm fat sm">
			<i class="fa fa-phone m--med-x"></i>
			<span class="text fat sm hide--med"><?php the_field('contact_phone') ?></span>
		</a>

		<a href="#contact" class="nav-target button fat sm">
			<i class="fab fa-telegram-plane m--med-x "></i>
			<span class="text fat sm hide--med c-text_l"><?php the_field('contact_section_title') ?></span>
		</a>
	</div>
</div>

<div class="col-12 nav-fixed d-n">

	<div class="align-c p-sm">
		<ul class="list col-7 hide--lg">
			<?php if(get_field('about_enable')): ?>
				<a class="nav-target" href="#about"><li class="nav-item d-i text sm"><?php the_field('about_title') ?></li></a>
			<?php endif ?>
			<?php if(get_field('services_enable')): ?>
				<a class="nav-target" href="#services"><li class="nav-item d-i text sm m-l-xsm"><?php the_field('services_title') ?></li></a>
			<?php endif; ?>
			<?php if(get_field('team_enable')): ?>
				<a class="nav-target" href="#equipe"><li class="nav-item d-i text sm m-l-xsm"><?php the_field('team_section_title') ?></li></a>
			<?php endif; ?>
			<?php if(get_field('work_enable')): ?>
				<a class="nav-target" href="#work"><li class="nav-item d-i text sm m-l-xsm"><?php the_field('work_title') ?></li></a>
			<?php endif; ?>
			<?php if(get_field('temoignage_enable')): ?>
				<a class="nav-target" href="#temoignages"><li class="nav-item d-i text sm m-l-xsm"><?php the_field('temoignage_title') ?></li></a>
			<?php endif; ?>
			<?php if(get_field('client_enable')): ?>
				<a class="nav-target" href="#clients"><li class="nav-item d-i text sm m-l-xsm"><?php the_field('client_title') ?></li></a>
			<?php endif ?>
		</ul>

		<div class="hide show--lg">
				<img id="mobile-nav" src="<?php echo get_template_directory_uri(); ?>/lib/images/nav.png" alt="logo">
				<img id="mobile-nav-close" class="hide" src="<?php echo get_template_directory_uri(); ?>/lib/images/nav_close.png" alt="close">
		</div>

		<div class="justify-r col-5 grid col--lg-12">
			<a href="tel:+1-<?php the_field('header_phone') ?>" class="button outline m-r-xsm fat sm"><i class="fa fa-phone m--sm-x"></i>
				<span class="text fat sm hide--sm"><?php the_field('contact_phone') ?></span></a>
			<a href="#contact" class="nav-target button fat sm"><i class="fab fa-telegram-plane m--sm-x "></i><span class="text fat sm hide--sm c-text_l"><?php the_field('contact_section_title') ?></span></a>
		</div>
	</div>

	<div class="mobile-list col-12 ta-c hide">
		<ul>
			<?php if(get_field('about_enable')): ?>
				<a class="nav-target" href="#about"><li class="text sm p-xsm"><?php the_field('about_title') ?></li></a>
			<?php endif ?>
			<?php if(get_field('services_enable')): ?>
				<a class="nav-target" href="#services"><li class="text sm p-xsm"><?php the_field('services_title') ?></li></a>
			<?php endif ?>
			<?php if(get_field('team_enable')): ?>
				<a class="nav-target" href="#equipe"><li class="text sm p-xsm"><?php the_field('team_section_title') ?></li></a>
			<?php endif ?>
			<?php if(get_field('work_enable')): ?>
				<a class="nav-target" href="#work"><li class="text sm p-xsm"><?php the_field('work_title') ?></li></a>
			<?php endif ?>
			<?php if(get_field('temoignage_enable')): ?>
				<a class="nav-target" href="#temoignages"><li class="text sm p-xsm"><?php the_field('temoignage_title') ?></li></a>
			<?php endif ?>
			<?php if(get_field('client_enable')): ?>
				<a class="nav-target" href="#clients"><li class="text sm p-xsm"><?php the_field('client_title') ?></li></a>
			<?php endif ?>

		</ul>
	</div>
</div>

<div class="Header container col-12" style="background-image:url('http://drupal-toolbusiness.s3.eu-west-2.amazonaws.com/Construction_0.jpg')">
	<div class="header-wrapper col-12">
		<h1 class="title xlg m-b-xsm"><?php the_field('header_titre') ?></h1>
		<?php if(get_field('about_enable')): ?>
			<a href="#about" class="nav-target button fat sm outline m-r-xxsm">Découvrez qui nous sommes</a><br class="hide show--med">
		<?php endif ?>
		<?php if (get_field('header_video')): ?>
		<button id="video-button" class="button fat sm m--med-t-xsm"><i class="fab fa-telegram-plane"></i>Visionnez la vidéo</button>
		<?php endif; ?>
	</div>
</div>

<div class="video-header align-c hide">
	<img class="video_close p-sm" src="<?php echo get_template_directory_uri(); ?>/lib/images/video_close.png" alt="fermer le video">
	<div class="grid justify-c">
		<div class="video-align">
			<div class="videoWrapper">
				<iframe src="<?php the_field('header_video') ?>" frameborder="0"  allowfullscreen></iframe>
			</div>
		</div>
	</div>

</div>
