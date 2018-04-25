<?php get_header() ?>

	<?php get_template_part('module-header') ?>
	<?php get_template_part('module-about') ?>
	<?php get_template_part('module-services') ?>
	<?php get_template_part('module-equipe') ?>
	<?php get_template_part('module-work') ?>
	<?php get_template_part('module-temoignages') ?>
	<?php get_template_part('module-clients') ?>
	<?php get_template_part('module-contact') ?>


	<div class="map">
		<div id="map"></div>
	</div>

	<div class="col-12">
		<p class="text xsm ta-c p-sm">© <?php echo date('Y'); ?>. Tous droits réservés</p>
	</div>



<?php get_footer() ?>
