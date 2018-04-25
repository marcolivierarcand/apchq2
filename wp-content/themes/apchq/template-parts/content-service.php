<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package raymond-voyage
 */

?>




<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="Lead container col-12">
		<div class="Lead-wrapper wrapper inset-height col-12">
			<h2 class="title xlg"><?php the_title(); ?></h2>
			<div class="text lh-lg sm m-t-sm"><?php echo get_the_content(); ?></div>
		</div>
	</div>
</article><!-- #post-<?php the_ID(); ?> -->
