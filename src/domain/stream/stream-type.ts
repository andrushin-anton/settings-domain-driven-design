import { BadArgumentError } from '@src/common';
import { StringValueObject } from '../basic';

const TYPES = [
    'FACEBOOK',
    'INSTAGRAM',
    'INSTAGRAM_LISTENING',
    'TWITTER',
    'TWITTER_LISTENING',
    'YOUTUBE',
    'YOUTUBE_LISTENING',
    'LINKEDIN',
    'DISQUS',
    'BRANDWATCH',
    'FACEBOOK_REVIEWS',
    'FACEBOOK_LOCATIONS',
    'GOOGLE_REVIEWS',
];

export class StreamType extends StringValueObject {
    public constructor(value: string) {
        super(value, true, 1, 30, 'stream type');
        this.check(value);
    }

    private check(value: string): void {
        if (!TYPES.includes(value)) {
            throw new BadArgumentError(`stream type must be one of these values: ${TYPES.toString()}`);
        }
    }
}
