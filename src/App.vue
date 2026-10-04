<script setup lang="ts">
import {
  mdiArrowTopRight,
  mdiEmailOutline,
  mdiGithub,
  mdiLinkedin,
  mdiMenu,
  mdiMicrophoneVariant,
  mdiNewspaperVariantOutline,
  mdiPlayCircleOutline,
} from '@mdi/js'
import { profile, projects, sideProjects, speaking } from './data/content'

const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Side projects', href: '#side-projects' },
  { label: 'Contact', href: '#contact' },
]

const links = [
  { label: 'Email', icon: mdiEmailOutline, href: `mailto:${profile.email}` },
  { label: 'GitHub', icon: mdiGithub, href: profile.github },
  { label: 'LinkedIn', icon: mdiLinkedin, href: profile.linkedin },
]

const mentionIcons = {
  talk: mdiMicrophoneVariant,
  article: mdiNewspaperVariantOutline,
  video: mdiPlayCircleOutline,
}

const year = new Date().getFullYear()
</script>

<template>
  <v-app>
    <v-app-bar flat border="b" density="comfortable" color="background">
      <v-container class="d-flex align-center py-0" style="max-width: 1040px">
        <a href="#top" class="text-title-medium font-weight-bold text-high-emphasis text-decoration-none">
          {{ profile.name }}
        </a>
        <v-spacer />
        <nav class="d-none d-sm-flex ga-1">
          <v-btn v-for="item in nav" :key="item.href" :href="item.href" variant="text" size="small">
            {{ item.label }}
          </v-btn>
        </nav>
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" class="d-sm-none" :icon="mdiMenu" variant="text" aria-label="Menu" />
          </template>
          <v-list density="compact">
            <v-list-item v-for="item in nav" :key="item.href" :href="item.href" :title="item.label" />
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main id="top">
      <v-container style="max-width: 1040px">
        <!-- Intro -->
        <section class="section pt-12 pt-md-16">
          <div class="d-flex flex-column flex-sm-row align-sm-center ga-5 mb-6">
            <v-avatar size="112" class="flex-shrink-0">
              <img :src="profile.photo" alt="Evan Klein" width="112" height="112" fetchpriority="high" />
            </v-avatar>
            <div>
              <h1 class="text-headline-large text-md-display-small font-weight-semibold mb-2">
                {{ profile.name }}
              </h1>
              <p class="text-body-large text-medium-emphasis mb-0">
                {{ profile.title }} · {{ profile.org }} · {{ profile.location }}
              </p>
            </div>
          </div>
          <div class="d-flex flex-wrap ga-1 ms-n3">
            <v-btn
              v-for="l in links"
              :key="l.label"
              :href="l.href"
              :target="l.href.startsWith('mailto') ? undefined : '_blank'"
              rel="noopener"
              :prepend-icon="l.icon"
              variant="text"
              size="small"
              color="primary"
            >
              {{ l.label }}
            </v-btn>
          </div>
        </section>

        <!-- Projects -->
        <section id="projects" class="section">
          <h2 class="eyebrow text-label-large text-medium-emphasis mb-10">Projects</h2>
          <article v-for="(p, i) in projects" :key="p.name" :class="{ 'project-divider': i > 0 }">
            <v-row>
              <v-col cols="12" md="4" class="d-none d-md-block">
                <div class="text-title-medium text-secondary font-weight-medium">{{ p.year }}</div>
                <div class="text-body-medium text-medium-emphasis mb-3">{{ p.where }}</div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip v-for="t in p.tags" :key="t">{{ t }}</v-chip>
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <div class="d-md-none text-label-large text-secondary mb-1">{{ p.year }} · {{ p.where }}</div>
                <h3 class="text-headline-small font-weight-semibold mb-3">{{ p.name }}</h3>
                <p class="text-body-large text-medium-emphasis mb-4">{{ p.summary }}</p>
                <ul class="highlights text-body-medium mb-4">
                  <li v-for="h in p.highlights" :key="h">{{ h }}</li>
                </ul>
                <div class="d-flex d-md-none flex-wrap ga-2 mb-2">
                  <v-chip v-for="t in p.tags" :key="t">{{ t }}</v-chip>
                </div>
                <div v-if="p.links" class="d-flex flex-wrap ga-2 ms-n4">
                  <v-btn
                    v-for="l in p.links"
                    :key="l.href"
                    :href="l.href"
                    target="_blank"
                    rel="noopener"
                    variant="text"
                    color="primary"
                    :append-icon="mdiArrowTopRight"
                  >
                    {{ l.label }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </article>
        </section>

        <!-- Speaking & press -->
        <section id="speaking" class="section">
          <h2 class="eyebrow text-label-large text-medium-emphasis mb-6">Speaking &amp; press</h2>
          <v-list bg-color="transparent" class="pa-0">
            <v-list-item
              v-for="s in speaking"
              :key="s.title"
              class="px-0"
              lines="three"
              :href="s.href"
              :target="s.href ? '_blank' : undefined"
              :rel="s.href ? 'noopener' : undefined"
              :prepend-icon="mentionIcons[s.kind]"
              :append-icon="s.href ? mdiArrowTopRight : undefined"
            >
              <v-list-item-title class="text-title-medium font-weight-semibold text-wrap">{{ s.title }}</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">{{ s.detail }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </section>

        <!-- Side projects -->
        <section id="side-projects" class="section">
          <h2 class="eyebrow text-label-large text-medium-emphasis mb-8">Side projects</h2>
          <v-row>
            <v-col v-for="s in sideProjects" :key="s.name" cols="12" sm="6" class="d-flex">
              <v-card
                variant="outlined"
                class="pa-2 w-100"
                :href="s.href"
                :target="s.href ? '_blank' : undefined"
                :rel="s.href ? 'noopener' : undefined"
              >
                <v-card-item>
                  <template v-if="s.href" #append>
                    <v-icon :icon="mdiGithub" size="small" class="text-medium-emphasis" />
                  </template>
                  <v-card-title class="text-title-medium font-weight-semibold text-wrap px-0">{{ s.name }}</v-card-title>
                  <v-card-subtitle class="px-0">{{ s.tech }}</v-card-subtitle>
                </v-card-item>
                <v-card-text class="text-body-medium text-medium-emphasis">{{ s.blurb }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <!-- Contact -->
        <section id="contact" class="section">
          <h2 class="text-headline-small font-weight-semibold mb-2">Get in touch</h2>
          <p class="text-body-large text-medium-emphasis mb-4">
            Email is best: <a :href="`mailto:${profile.email}`" class="text-primary">{{ profile.email }}</a>
          </p>
          <div class="d-flex flex-wrap ga-1 ms-n3">
            <v-btn
              v-for="l in links.slice(1)"
              :key="l.label"
              :href="l.href"
              target="_blank"
              rel="noopener"
              :prepend-icon="l.icon"
              variant="text"
              size="small"
              color="primary"
            >
              {{ l.label }}
            </v-btn>
          </div>
        </section>
      </v-container>
    </v-main>

    <v-footer color="background" border="t" class="justify-center text-body-small text-medium-emphasis py-6">
      © {{ year }} {{ profile.name }}
    </v-footer>
  </v-app>
</template>

<style scoped>
.project-divider {
  margin-top: 48px;
  padding-top: 48px;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.highlights {
  padding-left: 1.2em;
}

.highlights li {
  margin-bottom: 6px;
}

.highlights li::marker {
  color: rgb(var(--v-theme-secondary));
}
</style>
