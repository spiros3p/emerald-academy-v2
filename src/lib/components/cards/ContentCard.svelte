<script type="ts">
	import type { Overview } from '$lib/types/content/content-overview.interface';
	import { Label } from '@emerald-dao/component-library';
	import ContentLabel from '../label/ContentLabel.svelte';
	import { locale, LL } from '$i18n/i18n-svelte';
	import { ContentTypeEnum } from '$lib/types/content/metadata/content-types.enum';
	import { fly } from 'svelte/transition';
	import Author from '../atoms/Author.svelte';
	import ExpertiseLabel from '../atoms/labels/ExpertiseLabel.svelte';
	import DurationLabel from '../atoms/labels/DurationLabel.svelte';
	import CertificateLabel from '../atoms/labels/CertificateLabel.svelte';
	import Cadence1Label from '../atoms/labels/Cadence1Label.svelte';

	export let overview: Overview;

	let link: string;
	let onPlatform =
		overview.contentType != ContentTypeEnum.Blog &&
		overview.contentType != ContentTypeEnum.Tweet &&
		overview.contentType != ContentTypeEnum.YouTube;

	$: if (overview.contentType === ContentTypeEnum.Snippet) {
		link = `/${$locale}/${overview.slug}`;
	} else if (onPlatform) {
		link = `/${$locale}/catalog/${overview.slug}`;
	} else {
		link = overview.link;
	}
</script>

<a href={`${link}`} in:fly={{ y: 30, duration: 400 }} target={onPlatform ? '_self' : '_blank'}>
	<div class="card-primary">
		<div>
			<ContentLabel type={overview.contentType} color="primary">
				{$LL[overview.contentType]()}
			</ContentLabel>
			<h4>
				{overview.title}
			</h4>
			<div class="labels-wrapper">
				<!-- {#if overview.metadata.price}
					<Label size="x-small" iconLeft="tabler:currency-dollar" color="neutral" hasBorder={false}>
						{overview.metadata.price}
					</Label>
				{/if} -->
				{#if overview.metadata.expertise}
					<ExpertiseLabel expertise={overview.metadata.expertise} />
				{/if}
				{#if overview.metadata.duration}
					<DurationLabel duration={overview.metadata.duration} />
				{/if}
				{#if overview.certificateIncluded}
					<CertificateLabel />
				{/if}
				{#if overview.cadence1}
					<Cadence1Label />
				{/if}
			</div>
			{#if overview.contentType !== ContentTypeEnum.Bootcamp}
				{#if overview.author}
					<div class="course-author-wrapper">
						<Author
							name={overview.author.name}
							avatarUrl={overview.author.avatarUrl}
							socialMediaUrl={overview.author.socialMediaUrl}
							isVerified={overview.author.isVerified}
							walletAddress={overview.author.walletAddress}
							tip={false}
						/>
					</div>
				{/if}
			{/if}
			<p>
				{overview.excerpt}
			</p>
		</div>
		{#if overview.metadata.subjects.length > 0}
			<div>
				<h5 class="skills">{$LL.SKILLS_YOU_WILL_LEARN()}</h5>
				<div class="skill-labels-wrapper">
					{#each overview.metadata.subjects as subs}
						<Label size="x-small" color="neutral" hasBorder={false}>{subs}</Label>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</a>

<style type="scss">
	a {
		text-decoration: none;

		.card-primary {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: var(--clr-background-primary);

			&:hover {
				border-color: var(--clr-text-off);
				background-color: var(--clr-surface-primary);
			}

			h4 {
				margin: var(--space-4) 0 var(--space-4) 0;
			}

			.labels-wrapper {
				margin-bottom: var(--space-6);
			}

			p {
				color: var(--clr-text-main);
				font-size: var(--font-size-1);
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			h5 {
				margin-bottom: var(--space-3);
				font-size: var(--font-size-3);

				&.skills {
					font-size: var(--font-size-1);
					color: var(--clr-text-off);
				}
			}

			.skill-labels-wrapper,
			.labels-wrapper {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				gap: var(--space-3);
			}

			.course-author-wrapper {
				margin-bottom: var(--space-3);
			}
		}
	}
</style>
