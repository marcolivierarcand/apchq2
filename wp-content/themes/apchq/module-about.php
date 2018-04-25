<?php if(get_field('about_enable')): ?>
<div id="about" class="Lead container col-12">
	<div class="Lead-wrapper wrapper inset-height col-12">
		<h2 class="title xlg"><?php the_field('about_title') ?></h2>
		<p class="text m-t-sm"><?php the_field('about_content'); ?></p>
	</div>
</div>
<?php endif ?>
