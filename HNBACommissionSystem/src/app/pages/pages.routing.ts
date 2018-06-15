import { Routes } from '@angular/router';

import { AgentComponent } from './agent/agent.component';

import { BankComponent } from './bank/bank.component';

import { DesignationComponent } from './designations/designation.component';

import { ChangereasonComponent } from './changereason/changereason.component';

import { LevelComponent } from './level/level.component';

import { ImageUploadComponent } from './image-upload/image-upload.component';

import { MainDashboardComponent } from './main-dashboard/main-dashboard/main-dashboard.component';

import { SummeryComponent } from './summery/summery.component';

import { ProductsComponent } from './products/products.component';

import { ProductCategoryComponent } from './productcategory/productcategory.component';

import { CommissionRateChartComponent } from './commission-rate-chart/commission-rate-chart.component';

import { OverridingRateChartComponent } from './overriding-rate-chart/overriding-rate-chart.component';

import { ReturnRefundCancellationComponent } from './return-refund-cancellation/return-refund-cancellation.component';

import { ReturnRefundCancellationConfirmComponent } from './return-refund-cancellation-confirm/return-refund-cancellation-confirm.component';

import { ManualUploadsComponent } from './manual-uploads/manual-uploads.component';

import { ManualUploadsReceiptsComponent } from './manual-uploads-receipts/manual-uploads-receipts.component';

import { UserLoginComponent} from './user/user-login/user-login.component';

import { FstAllowanceComponent} from './fst-allowance/fst-allowance.component';

import { TargetAllowanceComponent} from './target-allowance/target-allowance.component';

import { RetainerAllowanceComponent} from './retainer-allowance/retainer-allowance.component';

import { RetainerBonusComponent} from './retainer-bonus/retainer-bonus.component';

import { GroupAchievementComponent} from './group-achievement/group-achievement.component';

import { AdvisorDevelopmentAllowanceComponent} from './advisor-development-allowance/advisor-development-allowance.component';

import { AdvisorRankingComponent} from './advisor-ranking/advisor-ranking.component';

import { TargetMaintainComponent} from './target-maintain/target-maintain.component';

import { IncevtiveConfigBancComponent} from './incevtive-config-banc/incevtive-config-banc.component';

import { IncevtiveRateBancComponent} from './incevtive-rate-banc/incevtive-rate-banc.component';

import { BancaOfficerComponent} from './banca-officer/banca-officer.component';

import { RefundRealisationComponent} from './refund-realisation/refund-realisation.component';

import { IndexComponent} from './index/index.component';

import { RecConfirmationComponent} from './rec-confirmation/rec-confirmation.component';

import { BatchProcessComponent} from './batch-process/batch-process.component';

import { ReturnRefundCancellationSystemComponent} from './return-refund-cancellation-system/return-refund-cancellation-system.component';

export const PAGE_ROUTES: Routes = [
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'UserLogin',//path: '',
        component: UserLoginComponent
    },
    {
        path: 'agent',
        component: AgentComponent
    },
    {
        path: 'bank',
        component: BankComponent
    },
    {
        path: 'imageUpload',
        component: ImageUploadComponent

    },
    {
        path: 'mainDashboard',
        component: MainDashboardComponent
    },
    {
        path: 'designation',
        component: DesignationComponent
    },
    {
        path: 'changereason',
        component: ChangereasonComponent
    },
    {
        path: 'level',
        component: LevelComponent
    },
    {
        path: 'summery',
        component: SummeryComponent
    },
    {
        path: 'product',
        component: ProductsComponent
    },
    {
        path: 'productcategory',
        component: ProductCategoryComponent
    },
    {
        path: 'commissionratechart',
        component: CommissionRateChartComponent
    },
    {
        path: 'overrridingratechart',
        component: OverridingRateChartComponent
    },
    {
        path: 'ReturnRefundCancellation',
        component: ReturnRefundCancellationComponent
    },
    {
        path: 'ReturnRefundCancellationConfirm',
        component: ReturnRefundCancellationConfirmComponent
    },
    {
        path:'ManualUploadsComponent',
        component: ManualUploadsComponent
    },
    {
        path:'ManualUploadsReceiptsComponent',
        component: ManualUploadsReceiptsComponent
    },
    {
        path:'FstAllowanceComponent',
        component: FstAllowanceComponent
    },
    {
        path:'TargetAllowanceComponent',
        component: TargetAllowanceComponent
    },
    {
        path:'RetainerAllowanceComponent',
        component: RetainerAllowanceComponent
    },
    {
        path:'RetainerBonusComponent',
        component: RetainerBonusComponent
    },
    {
        path:'GroupAchievementComponent',
        component: GroupAchievementComponent
    },
    {
        path:'AdvisorDevelopmentAllowanceComponent',
        component: AdvisorDevelopmentAllowanceComponent
    },
    {
        path:'AdvisorRankingComponent',
        component: AdvisorRankingComponent
    },
    {
        path:'TargetMaintainComponent',
        component: TargetMaintainComponent
    },
    {
        path:'IncevtiveRateBancComponent',
        component: IncevtiveRateBancComponent
    },
    {
        path:'IncevtiveConfigBancComponent',
        component: IncevtiveConfigBancComponent
    },
    {
        path:'BancaOfficerComponent',
        component: BancaOfficerComponent
    },
    {
        path:'RefundRealisationComponent',
        component: RefundRealisationComponent
    },
    {
        path:'RecConfirmationComponent',
        component: RecConfirmationComponent
    },
    {
        path:'ReturnRefundCancellationSystem',
        component: ReturnRefundCancellationSystemComponent
    },
    {
        path:'BatchProcessComponent',
        component: BatchProcessComponent
    }
];
