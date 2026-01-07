-- Smart Contract Issuance System
CREATE TABLE smart_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  contract_type TEXT NOT NULL, -- 'impact_bond', 'carbon_credit', 'revenue_share', 'milestone'
  contract_address TEXT UNIQUE,
  contract_status TEXT NOT NULL DEFAULT 'draft' CHECK (contract_status IN ('draft', 'active', 'paused', 'completed', 'disputed')),
  total_value DECIMAL(15,2) NOT NULL,
  value_flows JSONB NOT NULL,
  stakeholder_shares JSONB NOT NULL,
  performance_milestones JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activated_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE contract_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES smart_contracts(id),
  milestone_name TEXT NOT NULL,
  milestone_type TEXT NOT NULL, -- 'carbon_sequestration', 'biodiversity_index', 'water_quality', 'community_engagement'
  target_value DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(10,2) DEFAULT 0,
  verification_required BOOLEAN DEFAULT true,
  release_percentage DECIMAL(5,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'achieved', 'failed')),
  achieved_at TIMESTAMP WITH TIME ZONE,
  verified_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE value_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES smart_contracts(id),
  milestone_id UUID REFERENCES contract_milestones(id),
  release_amount DECIMAL(15,2) NOT NULL,
  stakeholder_distributions JSONB NOT NULL,
  release_trigger TEXT NOT NULL, -- 'milestone_achieved', 'time_based', 'performance_adjustment'
  verification_data JSONB,
  released_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contract_disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES smart_contracts(id),
  raised_by UUID REFERENCES auth.users(id),
  dispute_type TEXT NOT NULL, -- 'milestone_verification', 'value_calculation', 'stakeholder_share', 'performance_data'
  description TEXT NOT NULL,
  evidence JSONB,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'escalated')),
  resolution TEXT,
  resolved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE dynamic_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES smart_contracts(id),
  adjustment_type TEXT NOT NULL, -- 'value_increase', 'value_decrease', 'milestone_update', 'share_rebalance'
  trigger_data JSONB NOT NULL,
  adjustment_factor DECIMAL(5,4) NOT NULL,
  previous_value DECIMAL(15,2),
  new_value DECIMAL(15,2),
  rationale TEXT NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE multi_party_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES smart_contracts(id),
  party_id UUID REFERENCES auth.users(id),
  party_role TEXT NOT NULL, -- 'practitioner', 'investor', 'verifier', 'community'
  agreement_terms JSONB NOT NULL,
  signature_hash TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'revoked'))
);

-- Enable RLS
ALTER TABLE smart_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE value_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE multi_party_agreements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read smart contracts" ON smart_contracts FOR SELECT USING (true);
CREATE POLICY "Admin manage smart contracts" ON smart_contracts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read milestones" ON contract_milestones FOR SELECT USING (true);
CREATE POLICY "Admin manage milestones" ON contract_milestones FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Stakeholders view releases" ON value_releases FOR SELECT USING (true);
CREATE POLICY "Admin manage releases" ON value_releases FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can raise disputes" ON contract_disputes FOR INSERT WITH CHECK (auth.uid() = raised_by);
CREATE POLICY "Public read disputes" ON contract_disputes FOR SELECT USING (true);
CREATE POLICY "Admin resolve disputes" ON contract_disputes FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public read adjustments" ON dynamic_adjustments FOR SELECT USING (true);
CREATE POLICY "Admin manage adjustments" ON dynamic_adjustments FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Parties view agreements" ON multi_party_agreements FOR SELECT USING (auth.uid() = party_id OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Parties sign agreements" ON multi_party_agreements FOR UPDATE USING (auth.uid() = party_id);