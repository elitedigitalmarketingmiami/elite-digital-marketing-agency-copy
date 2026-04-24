import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [creators, careers, ambassadors] = await Promise.all([
      base44.asServiceRole.entities.CreatorApplication.list('-created_date', 500),
      base44.asServiceRole.entities.CareerApplication.list('-created_date', 500),
      base44.asServiceRole.entities.BrandAmbassador.list('-created_date', 500),
    ]);

    const newCreators = creators.filter(r => r.created_date >= since);
    const newCareers = careers.filter(r => r.created_date >= since);
    const newAmbassadors = ambassadors.filter(r => r.created_date >= since);

    const total = newCreators.length + newCareers.length + newAmbassadors.length;

    const body = `
Elite Digital Marketing — Daily Summary Report
Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

New Applications in the Last 24 Hours
======================================
Creator Applications:   ${newCreators.length}
Career Applications:    ${newCareers.length}
Ambassador Signups:     ${newAmbassadors.length}
--------------------------------------
Total New Submissions:  ${total}

${newCreators.length > 0 ? `\nNew Creators:\n${newCreators.map(r => `  • ${r.full_name} (${r.email}) — ${r.city}, ${r.state}`).join('\n')}` : ''}
${newCareers.length > 0 ? `\nNew Career Applicants:\n${newCareers.map(r => `  • ${r.full_name} (${r.email}) — ${r.position}`).join('\n')}` : ''}
${newAmbassadors.length > 0 ? `\nNew Ambassadors:\n${newAmbassadors.map(r => `  • ${r.full_name} (${r.email}) — Code: ${r.ambassador_code}`).join('\n')}` : ''}

${total === 0 ? 'No new submissions in the last 24 hours.' : ''}

— Elite Digital Marketing Agency (Automated Report)
    `.trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'elitemarketing@proton.me',
      from_name: 'Elite Digital Marketing',
      subject: `[DAILY SUMMARY] ${total} New Submission${total !== 1 ? 's' : ''} — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      body,
    });

    return Response.json({ success: true, sent: { creators: newCreators.length, careers: newCareers.length, ambassadors: newAmbassadors.length, total } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});