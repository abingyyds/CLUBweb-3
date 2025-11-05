import { supabase } from '../lib/supabaseClient';
import { ITheme } from '../types';

const TABLE = 'club_configs';

export async function getConfig(domainName: string): Promise<ITheme | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('config')
    .eq('domain_name', domainName)
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[getConfig] error:', error.message);
    throw error;
  }

  return (data?.config as ITheme) || null;
}

export async function upsertConfig(domainName: string, config: ITheme): Promise<void> {
  const payload = {
    domain_name: domainName,
    config,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from(TABLE)
    .upsert(payload, { onConflict: 'domain_name' });

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[upsertConfig] error:', error.message);
    throw error;
  }
}

export async function listDomains(): Promise<string[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('domain_name');

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[listDomains] error:', error.message);
    throw error;
  }

  return (data || []).map((r: { domain_name: string }) => r.domain_name);
}

export async function deleteConfig(domainName: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('domain_name', domainName);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteConfig] error:', error.message);
    throw error;
  }
}


