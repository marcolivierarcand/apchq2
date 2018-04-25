
<?php
if(get_field('client_enable')):


$images = get_field('client_gallery');
$size = '900x900'; // (thumbnail, medium, large, full or custom size)

if( $images ): ?>
<div id="clients" class="Lead container col-12">
	<div class="wrapper inset-top col-12">
		<h2 class="title xlg m-b-xsm"><?php the_field('client_title') ?></h2>
	</div>

		<div class="wrapper col-12 grid client-card inset-bottom"
		data-lightbox-parent
		data-lightbox-navigation
		data-lightbox-animate
		data-lightbox-infinite
		data-lightbox-gradient
		data-lightbox-paginate
		data-lightbox-descriptions="true"
		data-lightbox-mobileDescriptions="false"
		data-lightbox-descriptionsOnHover="true"
		data-lightbox-paginateLabel=" of "
		data-lightbox-verticalPadding="130"
		data-lightbox-horizontalPadding="20"
		data-lightbox--tablet="600"
		data-lightbox--tablet-descriptionsOnHover="false"
		data-lightbox--tablet-descriptions="false"
		data-lightbox--tablet-mobileDescriptions="true"
		>
			<?php foreach( $images as $image ): ?>
			<div class="col-2 col--lg-25 col--med-3 col--sm-6 p-xsm m-b-xsm"
			data-lightbox-child
			data-lightbox-url="<?php echo $image['sizes']['1400x900'] ?>"
			data-lightbox-title="<h2 class='title lg c-text_l m-b-xxsm'><?php echo $image['title'] ?></h2>"
			data-lightbox-description="<p class='text c-text_l'><?php echo $image['caption'] ?></p>"
			data-lightbox-caption=""
			>
				<a href="#">
					<img src="<?php echo $image['sizes'][$size] ?>" alt="<?php echo $image['title'] ?>">
				</a>
			</div>
			<?php endforeach; ?>
		</div>
	</div>


<?php endif; endif; ?>
