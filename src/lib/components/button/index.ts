import DefaultButton from './Default.svelte';
import CircleButton from './Circle.svelte';

export default Object.assign(DefaultButton, {
    Circle: CircleButton
});