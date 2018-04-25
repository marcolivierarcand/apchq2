




<div id="contact" class="Lead container col-12">
	<div class="wrapper inset-top col-12">
		<h2 class="title xlg m-b-xsm"><?php the_field('contact_section_title') ?></h2>
	</div>
	<div class="wrapper col-12 inset-bottom contact-card grid p-sm">
		<div class="col-5 col--med-12 p-xsm m-b-med">
			<img src="<?php echo get_field('header_logo')['url'];?>" alt="logo de l'entreprise" style="max-width: 150px;">
			<p class="text sm fat m-t-sm"><?php the_field('contact_name') ?></p>
			<p class="text xsm"><?php the_field('contact_address') ?>,
				<?php if (get_field('contact_bur') !== ""): ?>
				bureau&nbsp;<?php the_field('contact_bur') ?>
				<?php endif ?>
				<?php if (get_field('contact_suite') !== ""): ?>
				suite&nbsp;<?php the_field('contact_suite') ?>
				<?php endif ?>
				<?php if (get_field('contact_unite') !== ""): ?>
				unité&nbsp;<?php the_field('contact_unite') ?>
				<?php endif ?><br>
				<?php the_field('contact_ville') ?>
				<?php the_field('contact_prov') ?>
				<span class="up">
					<?php the_field('contact_code_post') ?>
				</span>

			</p>

			<a href="#map" class="nav-target link text xsm p-t-xsm"><i class="fa fa-map-marker-alt m-r-xxsm text"></i>itinéraire</a>
			<p class="text xsm fat m-t-sm"><i class="fa fa-phone m-r-xxsm"></i><?php the_field('contact_phone') ?></p>

			<?php if (get_field('contact_facebook') || get_field('contact_instagram') || get_field('contact_twitter') || get_field('contact_pinterest') || get_field('contact_linkedin') || get_field('contact_youtube')): ?>

			<p class="text sm fat m-t-sm">Suivez-nous :</p>

			<div class="col-12 social-list">
					<div class="col-12 social-list m-t-xsm">
						<?php if (get_field('contact_facebook')): ?>
							<a href="<?php the_field('contact_facebook') ?>" target="_blank" class="link">
								<i class="fab fa-facebook-f"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('contact_instagram')): ?>
							<a href="<?php the_field('contact_instagram') ?>" target="_blank" class="link">
								<i class="fab fa-instagram"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('contact_twitter')): ?>
							<a href="<?php the_field('contact_twitter') ?>" target="_blank" class="link">
								<i class="fab fa-twitter"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('contact_pinterest')): ?>
							<a href="<?php the_field('contact_pinterest') ?>" target="_blank" class="link">
								<i class="fab fa-pinterest-square"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('contact_linkedin')): ?>
							<a href="<?php the_field('contact_linkedin') ?>" target="_blank" class="link">
								<i class="fab fa-linkedin-in"></i>
							</a>
						<?php endif ?>
						<?php if (get_field('contact_youtube')): ?>
							<a href="<?php the_field('contact_youtube') ?>" target="_blank" class="link">
								<i class="fab fa-youtube"></i>
							</a>
						<?php endif ?>
					</div>
			</div>
			<?php endif ?>
		</div>

		<div class="col-7 col--med-12">
			<!-- <form action="" class="form"> -->
				<div class="form">


				<?php echo do_shortcode('[contact-form-7 id="46" title="Formulaire de contact 1"]') ?>
				</div>
			<!-- </form> -->
		</div>
	</div>
</div>
