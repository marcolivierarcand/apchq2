<?php if (get_field('temoignage_enable')): ?>

<div id="temoignages" class="Lead container col-12 testimony">

	<div class="Lead-wrapper wrapper inset-height col-12 slick-carousel">
		<?php while ( have_rows('temoignage_rep') ) : the_row(); ?>
			<div class="col-12">
				<h2 class="title xlg"><?php the_sub_field('testimonial_title') ?></h2>
				<p class="text m-t-med italic"><?php the_sub_field('testimonial_ctn') ?></p>
				<p class="text m-t-sm">- <?php the_sub_field('testimonial_prenom') ?> <?php the_sub_field('testimonial_nom') ?>, <?php the_sub_field('testimonial_city') ?></p>
			</div>
		<?php endwhile; ?>
	</div>


	<div class="slick-controls m--sm-t-sm">
		<div class="prev"></div>
		<div class="next"></div>
	</div>

</div>

<?php endif; ?>
