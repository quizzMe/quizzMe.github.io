import page from '//unpkg.com/page/page.mjs';
import { html, render } from '//unpkg.com/lit-html?module';
import { until } from '//unpkg.com/lit-html/directives/until?module';
import { cache } from '//unpkg.com/lit-html/directives/cache?module';
import { classMap } from '//unpkg.com/lit-html/directives/class-map?module';
import { styleMap } from '//unpkg.com/lit-html/directives/style-map?module';

const topics = {
    it: 'Information Technology',
    languages: 'Languages',
    hardware: 'Hardware',
    software: 'Software',
    frameworks: 'Frameworks',
    history: 'History',
    geography: 'Geography',
    science: 'Science',
    philosophy: 'Philosophy',
    other: 'Other',
};

export {
    page,
    html,
    render,
    until,
    cache,
    classMap,
    styleMap,
    topics
};