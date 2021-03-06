<style lang="sass">
.magic-symbol
    height: 1em
    width: 1em

    &.icon-100
        width: 1.88em

    &.icon-1000000
        width: 5.08em

    &.icon-CHAOS
        width: 1.20em

    &.cost
        margin-right: 1px

        &.cost-shadow:not(.icon-HW):not(.icon-HR)
            margin-right: 3px
            border-radius: 100px
            box-shadow: -2px 2px 0 rgba(0,0,0,0.85)

    &.cost.mini
        font-size: 50%

        &.cost-shadow:not(.icon-HW):not(.icon-HR)
            margin-right: 2px
            box-shadow: -1px 1px 0 rgba(0,0,0,0.85)
</style>

<script lang="ts">
import { PropType, defineComponent, h } from 'vue';

function calcActualValue(value: string, type: string[]) {
    if (type.includes('flat')) {
        return value + ',flat';
    }

    switch (value) {
    case 'T':
        if (type.includes('tap:old1')) {
            return 'T,old1';
        } else if (type.includes('tap:old2')) {
            return 'T,old2';
        } else {
            return 'T';
        }
    case 'W':
        if (type.includes('white:old')) {
            return 'W,old';
        } else {
            return 'W';
        }
    default:
        return value;
    }
}

export default defineComponent({
    name: 'MagicSymbol',

    functional: true,

    props: {
        value: {
            type:     String,
            required: true,
        },

        type: {
            type:    Array as PropType<string[]>,
            default: () => ['modern'],
        },
    },

    setup(props) {
        return () => {
            const value = props.value;
            const type = props.type;

            const actualValue = calcActualValue(value, type);

            const src = `magic/symbols.svg#icon-${actualValue}`;

            let klass = 'magic-symbol icon-' + actualValue;

            if (type.includes('cost')) {
                klass += ' cost';

                if (!type.includes('flat')) {
                    klass += ' cost-shadow';
                }
            }

            if (type.includes('mini')) {
                klass += ' mini';
            }

            return h('img', {
                class: klass,
                src,
                alt:   `{${value}}`,
            });
        };
    },
});
</script>
