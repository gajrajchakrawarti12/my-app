"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Separator } from "../components/ui/separator"
import { Badge } from "../components/ui/Badge"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { User, Mail, Phone, Bell, Shield, AlertTriangle, Info } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function UserDashboard() {
    const { user } = useAuth();
    const [userData, setUserData] = useState(user => ({
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
    }))
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState(null)


    useEffect(() => {
        if (user) {
            setUserData(user)
            setEditData(user)
        }
    }, [user])

    const handleSave = () => {
        setUserData(editData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditData(userData)
        setIsEditing(false)
    }

    const getInitials = (name) => {
        if (!name) return "";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0][0].toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">Manage your profile and preferences</p>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                        Active User
                    </Badge>
                </div>

                {/* Profile Overview Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg font-semibold">{getInitials(userData.fullName)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-xl">{userData.fullName}</CardTitle>
                                <CardDescription className="text-base">@{userData.username}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <CardTitle>Profile Information</CardTitle>
                                </div>
                                <Button variant={isEditing ? "outline" : "default"} size="sm" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? "Cancel" : "Edit"}
                                </Button>
                            </div>
                            <CardDescription>Your personal information and contact details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={isEditing ? editData.username : userData.username}
                                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-gray-50" : ""}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={isEditing ? editData.fullName : userData.fullName}
                                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-gray-50" : ""}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4" />
                                    <span>Email</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={isEditing ? editData.email : userData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-gray-50" : ""}
                                    placeholder="Optional"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4" />
                                    <span>Phone</span>
                                </Label>
                                <Input
                                    id="phone"
                                    value={isEditing ? editData.phone : userData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-gray-50" : ""}
                                    placeholder="Optional"
                                />
                            </div>

                            {isEditing && (
                                <div className="flex space-x-2 pt-4">
                                    <Button onClick={handleSave} className="flex-1">
                                        Save Changes
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Bell className="h-5 w-5" />
                                <CardTitle>Notification Preferences</CardTitle>
                            </div>
                            <CardDescription>Configure how you want to receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Communication Preferences */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-gray-900">Communication Methods</h4>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <Label htmlFor="notify_email" className="font-medium">
                                                Email Notifications
                                            </Label>
                                        </div>
                                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        id="notify_email"
                                        checked={userData.notify_email}
                                        onCheckedChange={(checked) => setUserData({ ...userData, notify_email: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <Label htmlFor="notify_sms" className="font-medium">
                                                SMS Notifications
                                            </Label>
                                        </div>
                                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                                    </div>
                                    <Switch
                                        id="notify_sms"
                                        checked={userData.notify_sms}
                                        onCheckedChange={(checked) => setUserData({ ...userData, notify_sms: checked })}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Risk Level Preferences */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-gray-900">Risk Level Notifications</h4>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Shield className="h-4 w-4 text-red-500" />
                                            <Label htmlFor="notify_high_risk" className="font-medium">
                                                High Risk Alerts
                                            </Label>
                                        </div>
                                        <p className="text-sm text-gray-600">Critical security and system alerts</p>
                                    </div>
                                    <Switch
                                        id="notify_high_risk"
                                        checked={userData.notify_high_risk}
                                        onCheckedChange={(checked) => setUserData({ ...userData, notify_high_risk: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <Label htmlFor="notify_medium_risk" className="font-medium">
                                                Medium Risk Alerts
                                            </Label>
                                        </div>
                                        <p className="text-sm text-gray-600">Important updates and warnings</p>
                                    </div>
                                    <Switch
                                        id="notify_medium_risk"
                                        checked={userData.notify_medium_risk}
                                        onCheckedChange={(checked) => setUserData({ ...userData, notify_medium_risk: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Info className="h-4 w-4 text-blue-500" />
                                            <Label htmlFor="notify_low_risk" className="font-medium">
                                                Low Risk Alerts
                                            </Label>
                                        </div>
                                        <p className="text-sm text-gray-600">General information and tips</p>
                                    </div>
                                    <Switch
                                        id="notify_low_risk"
                                        checked={userData.notify_low_risk}
                                        onCheckedChange={(checked) => setUserData({ ...userData, notify_low_risk: checked })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Email Status</p>
                                    <p className="text-lg font-semibold">{userData.notify_email ? "Enabled" : "Disabled"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600">SMS Status</p>
                                    <p className="text-lg font-semibold">{userData.notify_sms ? "Enabled" : "Disabled"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2">
                                <Bell className="h-5 w-5 text-purple-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                                    <p className="text-lg font-semibold">
                                        {
                                            [userData.notify_high_risk, userData.notify_medium_risk, userData.notify_low_risk].filter(Boolean)
                                                .length
                                        }
                                        /3
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
