<?php

if(get_field('services_enable')):

$args = array(
	'post_type' => 'services',
	'posts_per_page' => '-1',
	'post_status' => 'publish'

);

// The Query
$custom_query = new WP_Query( $args );

// The Loop
	if ( $custom_query->have_posts() ):
		$counter = 0; ?>
		<div id="services"><?php
		while ( $custom_query->have_posts() ) :
			$custom_query->the_post();
			$counter++;
			if ($counter % 2 == 1 ) : ?>
				<div class="Feature grid col-12">
				<div class="Feature-image col-5 col--med-12">
					<div class="Feature-image-wrap col-12" style="background-image:url('<?php the_post_thumbnail_url('900x900'); ?>')"></div>
				</div>

				<div class="Feature-content col-7 col--med-12">
					<h4 class="title lg"><?php the_title(); ?></h4>
					<p class="text sm m-t-xsm"><?php echo get_the_content(); ?></p>
					<!-- <a href="<?php echo get_permalink(); ?>" class="link">Voir le service</a> -->
				</div>
			</div>
			<?php else : ?>
				<div class="Feature col-12">
				<div class=" flex-reverse grid">


					<div class="Feature-image col-5 col--med-12">
						<div class="Feature-image-wrap col-12" style="background-image:url('<?php the_post_thumbnail_url('900x900'); ?>')"></div>
					</div>

					<div class="Feature-content col-7 col--med-12">
						<h4 class="title lg"><?php the_title(); ?></h4>
						<p class="text sm m-t-xsm"><?php echo get_the_content(); ?></p>
						<!-- <a href="<?php echo get_permalink(); ?>" class="link">Voir le service</a> -->
					</div>

				</div>
			</div>


			<?php endif; ?>
		<?php endwhile; ?>
		</div> <!-- service -->



		<?php
		/* Restore original Post Data */
		wp_reset_postdata();
	endif;

endif;

?>
