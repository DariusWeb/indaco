<template>
    <div class="section-node" :class="presentLabel || node.text ? 'mb-2 pl-4 border-l border-gray-200' : ''">
        <!-- Render label & text -->
        <h3 v-if="presentLabel" :class="headingClass">
            {{ presentLabel }}
        </h3>
        <p v-if="node.text" :class="textClass">
            {{ node.text }}
        </p>

        <!-- Render children recursively -->
        <div v-if="hasChildren" class="mt-2 pl-4">
            <SectionNode v-for="child in node.sections" :key="child.id" :node="child" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue"

    interface Classification {
        type?: string
        label?: string
    }

    interface Node {
        id?: string
        text?: string
        classification?: Classification
        path?: string
        sections?: Node[]
    }

    const props = defineProps<{ node: Node }>()

    const hasChildren = computed(
        () => Array.isArray(props.node.sections) && props.node.sections.length > 0
    )

    const presentLabel = computed(() => {
        const cls = props.node.classification?.type || ""
        const label = props.node.classification?.label || props.node.path || ""
        return `${cls} ${label}`.trim()
    })

    // Map classification types to consistent styles
    const headingClass = computed(() => {
        switch (props.node.classification?.type) {
            case "Sectiune":
                return "text-xl font-bold text-gray-900 mt-4 pt-4 mb-2"
            case "Articol":
                return "text-md font-semibold text-gray-800 mt-3 mb-2"
            case "Alineat":
                return "text-md font-semibold text-gray-700 m-2"
            case "Litera":
                return "text-md font-semibold text-gray-700 mb-1"
            default:
                return "text-sm text-gray-600"
        }
    })

    const textClass = computed(() => {
        return "text-sm text-gray-700"
    })
</script>
