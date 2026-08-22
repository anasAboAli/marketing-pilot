import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardPage from "@/pages/dashboard/DashboardPage.vue";
import CampaignsPage from "@/pages/campaigns/CampaignsPage.vue";
import CreateCampaignPage from "@/pages/campaigns/CreateCampaignPage.vue";
import CampaignDetailsPage from "@/pages/campaigns/CampaignDetailsPage.vue";
import ClientsPage from "@/pages/clients/ClientsPage.vue";
import ClientDetailsPage from "@/pages/clients/ClientDetailsPage.vue";
import LeadsPage from "@/pages/leads/LeadsPage.vue";
import LeadDetailsPage from "@/pages/leads/LeadDetailsPage.vue";
import Analytics from "@/pages/analytics/AnalyticsPage.vue";
import ReportsPage from "@/pages/reports/ReportsPage.vue";
import TeamPage from "@/pages/team/TeamPage.vue";
import SettingsPage from "@/pages/settings/SettingsPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage.vue";
import ProfilePage from "@/pages/profile/ProfilePage.vue";
import NotificationsPage from "@/pages/notifications/NotificationsPage.vue";
import NotFoundPage from "@/pages/errors/NotFoundPage.vue";
import UsersPage from "@/pages/users/UsersPage.vue";
import CreateUserPage from "@/pages/users/CreateUserPage.vue";
import UserDetailsPage from "@/pages/users/UserDetailsPage.vue";
import PipelinePage from "@/pages/crm/PipelinePage.vue";
import OpportunitiesPage from "@/pages/crm/OpportunitiesPage.vue";
import ActivitiesPage from "@/pages/crm/ActivitiesPage.vue";
import NotesPage from "@/pages/crm/NotesPage.vue";
import AutomationPage from "@/pages/automation/AutomationPage.vue";
import EmailCampaignsPage from "@/pages/automation/EmailCampaignsPage.vue";
import SmsCampaignsPage from "@/pages/automation/SmsCampaignsPage.vue";
import TemplatesPage from "@/pages/automation/TemplatesPage.vue";
import SegmentsPage from "@/pages/automation/SegmentsPage.vue";
import CampaignBuilderPage from "@/pages/campaign-builder/CampaignBuilderPage.vue";
import SocialDashboardPage from "@/pages/social/SocialDashboardPage.vue";
import CalendarPage from "@/pages/social/CalendarPage.vue";
import PostsPage from "@/pages/social/PostsPage.vue";
import CreatePostPage from "@/pages/social/CreatePostPage.vue";
import MediaLibraryPage from "@/pages/social/MediaLibraryPage.vue";
import ChannelsPage from "@/pages/social/ChannelsPage.vue";
import AnalyticsPage from "@/pages/social/AnalyticsPage.vue";
import HashtagsPage from "@/pages/social/HashtagsPage.vue";
import AiDashboardPage from "@/pages/ai/AiDashboardPage.vue";
import ContentGeneratorPage from "@/pages/ai/ContentGeneratorPage.vue";
import AdCopyPage from "@/pages/ai/AdCopyPage.vue";
import SeoAssistantPage from "@/pages/ai/SeoAssistantPage.vue";
import KeywordResearchPage from "@/pages/ai/KeywordResearchPage.vue";
import LandingPageGenerator from "@/pages/ai/LandingPageGenerator.vue";
import AudienceInsightsPage from "@/pages/ai/AudienceInsightsPage.vue";
import EmailWriterPage from "@/pages/ai/EmailWriterPage.vue";
import ImageIdeasPage from "@/pages/ai/ImageIdeasPage.vue";
import WorkspacesPage from "@/pages/workspace/WorkspacesPage.vue";
import MembersPage from "@/pages/workspace/MembersPage.vue";
import RolesPage from "@/pages/workspace/RolesPage.vue";
import PermissionsPage from "@/pages/workspace/PermissionsPage.vue";
import BillingPage from "@/pages/workspace/BillingPage.vue";
import PortalDashboard from "@/components/portal/PortalDashboard.vue";
import ClientCampaigns from "@/components/portal/ClientCampaigns.vue";
import ClientInvoices from "@/components/portal/ClientInvoices.vue";
import ClientSupport from "@/components/portal/ClientSupport.vue";
import authGuard from "@/middleware/auth";
import guestGuard from "@/middleware/guest";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardPage,
      },
      {
        path: "campaigns",
        name: "campaigns",
        component: CampaignsPage,
      },
      {
        path: "campaigns/create",
        name: "create-campaign",
        component: CreateCampaignPage,
      },
      {
        path: "campaigns/:id",
        name: "campaign-details",
        component: CampaignDetailsPage,
      },
      {
        path: "clients",
        name: "clients",
        component: ClientsPage,
      },
      {
        path: "clients/:id",
        name: "client-details",
        component: ClientDetailsPage,
      },
      {
        path: "leads",
        name: "leads",
        component: LeadsPage,
      },
      {
        path: "leads/:id",
        name: "lead-details",
        component: LeadDetailsPage,
      },
      {
        path: "analytics",
        name: "analytics",
        component: Analytics,
      },
      {
        path: "reports",
        name: "reports",
        component: ReportsPage,
      },
      {
        path: "team",
        name: "team",
        component: TeamPage,
      },
      {
        path: "settings",
        name: "settings",
        component: SettingsPage,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },

      {
        path: "/forgot-password",
        name: "forgot-password",
        component: ForgotPasswordPage,
      },
      {
        path: "profile",
        component: ProfilePage,
      },

      {
        path: "notifications",
        component: NotificationsPage,
      },

      
      {
        path: "users",
        component: UsersPage,
      },

      {
        path: "users/create",
        component: CreateUserPage,
      },

      {
        path: "users/:id",
        component: UserDetailsPage,
      },
      {
        path: "crm/pipeline",
        component: PipelinePage,
      },
      {
        path: "crm/opportunities",
        component: OpportunitiesPage,
      },
      {
        path: "crm/activities",
        component: ActivitiesPage,
      },
      {
        path: "crm/notes",
        component: NotesPage,
      },
      {
        path: "automation",
        component: AutomationPage,
      },

      {
        path: "automation/emails",
        component: EmailCampaignsPage,
      },

      {
        path: "automation/sms",
        component: SmsCampaignsPage,
      },

      {
        path: "automation/templates",
        component: TemplatesPage,
      },

      {
        path: "automation/segments",
        component: SegmentsPage,
      },
      {
        path: "campaign-builder",
        component: CampaignBuilderPage,
      },
      {
        path: "social",
        component: SocialDashboardPage,
      },

      {
        path: "social/calendar",
        component: CalendarPage,
      },

      {
        path: "social/posts",
        component: PostsPage,
      },

      {
        path: "social/posts/create",
        component: CreatePostPage,
      },

      {
        path: "social/media",
        component: MediaLibraryPage,
      },

      {
        path: "social/channels",
        component: ChannelsPage,
      },

      {
        path: "social/analytics",
        component: AnalyticsPage,
      },

      {
        path: "social/hashtags",
        component: HashtagsPage,
      },
      {
        path: "ai",
        component: AiDashboardPage,
      },
      {
        path: "ai/content",
        component: ContentGeneratorPage,
      },
      {
        path: "ai/ad-copy",
        component: AdCopyPage,
      },
      {
        path: "ai/seo",
        component: SeoAssistantPage,
      },
      {
        path: "ai/keywords",
        component: KeywordResearchPage,
      },
      {
        path: "ai/landing-page",
        component: LandingPageGenerator,
      },
      {
        path: "ai/audience",
        component: AudienceInsightsPage,
      },
      {
        path: "ai/email",
        component: EmailWriterPage,
      },
      {
        path: "ai/image-ideas",
        component: ImageIdeasPage,
      },
      {
        path: "workspace",
        component: WorkspacesPage,
      },

      {
        path: "workspace/members",
        component: MembersPage,
      },

      {
        path: "workspace/roles",
        component: RolesPage,
      },

      {
        path: "workspace/permissions",
        component: PermissionsPage,
      },

      {
        path: "workspace/billing",
        component: BillingPage,
      },
      {
        path: "portal",
        component: PortalDashboard,
      },

      {
        path: "portal/campaigns",
        component: ClientCampaigns,
      },

      {
        path: "portal/invoices",
        component: ClientInvoices,
      },

      {
        path: "portal/support",
        component: ClientSupport,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path === "/login" || to.path === "/forgot-password")
    return guestGuard(to);
  return authGuard(to);
});

export default router;
