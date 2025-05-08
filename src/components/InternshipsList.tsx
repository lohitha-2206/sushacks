import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // CSV parser
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Define the types
interface InternshipRaw {
  id: string;
  apply: string | null;
  company: string | null;
  company_industry: string | null;
  company_size: string | null;
  created_at: string | null;
  date: string | null;
  graduate_time: string | null;
  hire_time: string | null;
  location: string | null;
  qualifications: string | null;
  salary: string | null;
  title: string | null;
  work_model: string | null;
}

const InternshipsList = () => {
  const [internships, setInternships] = useState<InternshipRaw[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { savedInternships, saveInternship, unsaveInternship } = useData();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [workModel, setWorkModel] = useState('all');
  const [location, setLocation] = useState('all');

  // Load CSV data from public folder
  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch('/Grid view (1) (1).csv'); // move your file to public/data/internships.csv
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data as Omit<InternshipRaw, 'id'>[];
            const withIds = parsedData.map((item) => ({
              ...item,
              id: `internship-${Math.random().toString(36).substring(2, 9)}`
            }));
            setInternships(withIds);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error('Error reading CSV:', err);
        setError('Failed to load internship data');
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchCSVData();
  }, []);

  return (
    <div>
      {/* Your rendered JSX here */}
    </div>
  );
};

export default InternshipsList;
