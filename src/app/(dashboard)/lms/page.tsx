"use client";

import LmsCatalogPage from "@/components/dashboard/lms-catalog";
import { 
  Search, BookOpen, Clock, ChevronRight, PlayCircle, Star,
  CheckCircle2, Video, Download, Award, ArrowLeft, Users, Plus, Flame, Target, PenTool, Check
} from "lucide-react";
export default function LMSHubPage() {
  return (
    <div className="space-y-6">
      <LmsCatalogPage />
    </div>
  );
}