import type { Quickstart } from '$lib/types/content/quickstart.interface';
import { ContentTypeEnum } from '$lib/types/content/metadata/content-types.enum';

export const overview: Quickstart = {
	title: 'Hello World - Swift (iOS/iPadOS)',
	mobile: true,
	contentType: ContentTypeEnum.Quickstart,
	audited: true,
	web: 'SwiftUI',
	author: {
		name: 'BoiseITGuru',
		socialMediaUrl: 'https://twitter.com/boise_it_guru',
		avatarUrl:
			'https://avatars.githubusercontent.com/u/3641594?s=400&u=044fd05bc61270527c4da99212f143595d6fa4a1&v=4',
		isVerified: true,
		walletAddress: '0x76d988a29af9ea8d'
	},
	quickstartRepositoryUrl: 'github.com/boiseitguru/0-hello-world-ios',
	description: 'A mobile DApp that lets users read and change a greeting field on Flow testnet.'
};