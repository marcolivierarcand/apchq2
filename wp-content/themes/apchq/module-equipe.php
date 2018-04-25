<?php

if(get_field('team_enable')):


$args = array(
	'post_type' => 'equipe',
	'posts_per_page' => '-1',
	'post_status' => 'publish'

);

// The Query
$custom_query = new WP_Query( $args );

// The Loop
if ( $custom_query->have_posts() ) { ?>

	<div id="equipe" class="Lead container col-12">
		<div class="wrapper inset-top col-12">
			<h2 class="title xlg m-b-xsm"><?php the_field('team_section_title') ?></h2>
		</div>
		<div class="wrapper col-12 grid project-card inset-bottom">

		<?php while ( $custom_query->have_posts() ) :
			$custom_query->the_post(); ?>

			<div class="col-4 col--med-6 col--xsm-12 p-xsm m-b-sm">
				<img src="<?php the_post_thumbnail_url('600x600'); ?>" alt="" >
				<p class="text fat sm m-t-sm"><?php the_field('team_prenom'); echo " "; the_field('team_nom'); ?> </p>
				<p class="text xsm"><?php the_field('team_title'); ?></p>
				<ul class="list icons lh-5 m-t-xsm">
					<li class="text xsm"><i class="fa fa-phone "></i>
						<?php the_field('team_phone');
						echo " ";


						if(get_field('team_phoneposte')):
						echo "poste&nbsp;";
						the_field('team_phoneposte');
					 	endif; ?></li>
					<a href="mailto:<?php the_field('team_email') ?>" class="link"><li class="text xsm hover"><i class="fa fa-envelope"></i><?php the_field('team_email') ?></li></a>
				</ul>

				<?php if (get_field('team_facebook') || get_field('team_instagram') || get_field('team_twitter') || get_field('team_pinterest') || get_field('team_linkedin') || get_field('team_youtube')): ?>
					<div class="col-12 social-list m-t-xsm">
						<?php if (get_field('team_facebook')): ?>
							<a href="<?php the_field('team_facebook') ?>" target="_blank" class="link">
								<i class="fab fa-facebook-f"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('team_instagram')): ?>
							<a href="<?php the_field('team_instagram') ?>" target="_blank" class="link">
								<i class="fab fa-instagram"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('team_twitter')): ?>
							<a href="<?php the_field('team_twitter') ?>" target="_blank" class="link">
								<i class="fab fa-twitter"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('team_pinterest')): ?>
							<a href="<?php the_field('team_pinterest') ?>" target="_blank" class="link">
								<i class="fab fa-pinterest-square"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('team_linkedin')): ?>
							<a href="<?php the_field('team_linkedin') ?>" target="_blank" class="link">
								<i class="fab fa-linkedin-in"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('team_youtube')): ?>
							<a href="<?php the_field('team_youtube') ?>" target="_blank" class="link">
								<i class="fab fa-youtube"></i>
							</a>
						<?php endif ?>
					</div>
			<?php endif ?>
			</div>
			<?php endwhile; ?>

		</div>
	</div>


	<?php
	/* Restore original Post Data */
	wp_reset_postdata();
}
endif;
?>
