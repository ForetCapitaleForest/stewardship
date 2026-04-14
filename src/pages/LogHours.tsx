import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';
import { ActivityLog } from '@/types';

const LogHours: React.FC = () => {
  const { currentUser, sites, addActivityLog } = useStore();
  const [formData, setFormData] = React.useState({
    siteId: '',
    date: new Date().toISOString().split('T')[0],
    hoursWorked: 1,
    taskType: 'watering',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const log: ActivityLog = {
      id: `log-${Date.now()}`,
      volunteerId: currentUser.id,
      siteId: formData.siteId,
      date: new Date(formData.date),
      hoursWorked: formData.hoursWorked,
      taskType: formData.taskType,
      tasksCompleted: [formData.description],
      supplies: [],
      conditions: { weather: 'sunny', temperature: 20 },
      photos: [],
      notes: formData.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addActivityLog(log);
    alert('Hours logged successfully!');
    setFormData({ siteId: '', date: new Date().toISOString().split('T')[0], hoursWorked: 1, taskType: 'watering', description: '' });
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card><CardBody><p className="text-center text-gray-600 py-8">Please log in</p></CardBody></Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Log Hours</h1>
      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">Record Your Activity</h2></CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Site</label>
              <select required value={formData.siteId} onChange={(e) => setFormData({...formData, siteId: e.target.value})} className="input-field">
                <option value="">Select a site</option>
                {Object.values(sites).map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Date</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="input-field" />
            </div>
            <div>
              <label className="label">Hours Worked</label>
              <input type="number" min="0.5" step="0.5" required value={formData.hoursWorked} onChange={(e) => setFormData({...formData, hoursWorked: parseFloat(e.target.value)})} className="input-field" />
            </div>
            <div>
              <label className="label">Task Type</label>
              <select required value={formData.taskType} onChange={(e) => setFormData({...formData, taskType: e.target.value})} className="input-field">
                <option value="watering">Watering</option>
                <option value="pruning">Pruning</option>
                <option value="planting">Planting</option>
                <option value="mulching">Mulching</option>
                <option value="cleanup">Cleanup</option>
              </select>
            </div>
            <div>
              <label className="label">Description</label>
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-field" placeholder="Describe what you did..." />
            </div>
            <Button type="submit" className="w-full">Log Hours</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LogHours;

// Made with Bob
