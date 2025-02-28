<script setup>
import WelcomeItem from './WelcomeItem.vue'
// import ClothingIcon from './icons/IconClothing.vue'
// import OrganizeIcon from './icons/IconOrganize.vue'
// import CategoriesIcon from './icons/IconCategories.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <ClothingIcon />
    </template>
    <template #heading>Manage Your Wardrobe</template>

    Keep track of your wardrobe with ease. Our app allows you to add, edit, and delete clothing
    items, making it simple to organize everything in one place.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <OrganizeIcon />
    </template>
    <template #heading>Organize by Categories</template>

    Organize your clothing into categories like tops, bottoms, shoes, and accessories. Use the
    filter and search features to find specific items quickly.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CategoriesIcon />
    </template>
    <template #heading>Custom Filters</template>

    Tailor your wardrobe management experience with custom filters based on item type, color, and
    other attributes. Stay organized by easily sorting your items.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Connect with the Community</template>

    Join our community to share style tips and wardrobe management ideas with others. Ask questions,
    share your experiences, and get inspired.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Our Project</template>

    Help us improve the Wardrobe Management System by providing feedback or becoming a contributor.
    Together, we can make wardrobe organization even easier!
  </WelcomeItem>
</template>
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #333;
  font-family: 'Arial', sans-serif;
  margin-bottom: 10px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
}

h3 {
  font-size: 1.75rem;
  font-weight: bold;
}

h4 {
  font-size: 1.5rem;
  font-weight: bold;
}

h5 {
  font-size: 1.25rem;
  font-weight: bold;
}

h6 {
  font-size: 1rem;
  font-weight: bold;
}
</style>
